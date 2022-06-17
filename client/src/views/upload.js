import React, { useState } from "react";
import Navbar from "../components/nav.js";
import Footer from "../components/footer.js";
import "./allNotes.css"
import Container from "@mui/material/Container/index.js"
import enviromentAPI from '../config/config.js'
import { useAuth0 } from '@auth0/auth0-react'
import Card from "@mui/material/Card/index.js"
import Button from "@mui/material/Button/index.js"
import Grid from "@mui/material/Grid/index.js"
import NoteRoutes from "../router/noteRoutes.js"

const UploadNotes = () => {
    const [array, setArray] = useState([]);
    const [file, setFile] = useState();
    const fileReader = new FileReader();
    const [isFile, setIsFile] = useState(false);
    const { user } = useAuth0();
    const userId = user.sub.split("|")[1];
    const [fileButtontext, setFileButtontext] = useState("Preview Notes");

    const handleOnChange = (e) => {
        setIsFile(true)
        setFile(e.target.files[0]);
    };

    const switchOperation = (e, file) => {
        e.preventDefault();
        setArray([])
        if (fileButtontext === "Import Notes") {
            handleOnSubmit(e)
        }
        else {
            if (isFile) {
                fileReader.onload = function (event) {
                    const csvOutput = event.target.result;
                    previewFileTXT(csvOutput)
                };
                fileReader.readAsText(file);
            }
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (isFile) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                if(csvOutput.length === 0){
                    return "Empyt File"
                }
                csvFileToArray(csvOutput)
            };
            fileReader.readAsText(file);
        }
    };

    const csvFileToArray = string => {
        let noteObject = {
            "note": string,
            "filetype": ".txt"
        }
        storeNewNote(noteObject);

    };

    const previewFileTXT = (string) => {
        let notes = string.split('\n')

        let arrayOfNotes = [];

        let note = {
            "date": "",
            "text": "",
            "star": "None"
        }

        for (let i = 0; i <= notes.length - 1;) {
            let date;
            let text = '';

            let noteDate = new Date(notes[i]);
            if (noteDate != "Invalid Date") {
                date = noteDate
                note['date'] = noteDate.toISOString().split("T")[0]
                i++
            }
            if(noteDate == "Invalid Date" ){
                console.log("Invalid Date")
            }

            while (notes[i] != "\n" && (notes[i] != "undefined" || notes[i] != undefined) && i < notes.length) {
                if (notes[i] === "\r" || notes[i].length === 0) {
                    if (i +1 < notes.length && (notes[i + 1] === "\r" || notes[i + 1].length === 0)) {
                        while (notes[i + 1] === "\r" || notes[i + 1].length == 0) {

                            i++
                        }
                    }
                    if (text.length > 0) {
                        note["text"] = text.trim()
                        break;
                    }
                    i++
                }
                text = text + '\n' + notes[i]
                i++
            }

            if (text.length > 0) {
                note["text"] = text.trim()
            }
            arrayOfNotes.push(note)
            note = {
                "date": "",
                "text": "",
                "star": "None"
            }
            i++
        }
        setArray(arrayOfNotes)
        setFileButtontext("Import Notes")
    }

    const previewFileCSV = (string) => {
        // const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        // const restOftext = Array.from(string.slice(string.indexOf("\n") + 1))
        // const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        // const array = csvRows.map(i => {
        //     const values = i.split(",");
        //     const obj = csvHeader.reduce((object, header, index) => {
        //         object[header] = values[index];
        //         return object;
        //     }, {});
        //     return obj;
        // });
        // setArray(array)
    }
    // const headerKeys = Object.keys(Object.assign({}, ...array));


    const storeNewNote = async (value) => {
        let response = await NoteRoutes.uploadNotes(value,userId)
        setFileButtontext("Preview Notes")
        console.log(response)
    }

    return (
        <>
            <Navbar></Navbar>
            <Container id="container">
                <form>
                    <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={[".csv", ".txt"]}
                        onChange={handleOnChange}
                    />

                    <button
                        onClick={(e) => {
                            switchOperation(e, file, fileButtontext);
                        }}
                    >
                        {fileButtontext}
                    </button>

                    <button>
                        Example .txt File
                    </button>

                </form>

                <Container style={{ paddingBottom: "3%", marginTop: ".5%" }}>
                    <Grid
                        style={{ width: "90% !important" }}
                        container spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        {array.map((note, i) => {

                            return (
                                <Grid key={i + 100} item xs={12} sm={6} md={4} lg={3}>
                                    <Card
                                        style={{ marginBottom: "2%" }}
                                        key={i + 110}
                                        id="Card"
                                        value={note.id}
                                        variant="outlined"
                                    >
                                        <div
                                            key={i + 104}
                                            style={{ marginBottom: "5%", borderBottom: "1px solid #e8e8e8" }}
                                        >
                                            <span style={{ marginRight: "12%" }}> <strong>{note.date}</strong></span>
                                            <strong>✨ 's:&nbsp; {note.star}</strong>
                                        </div>
                                        {note.text.split("\n").map((i, key) => {
                                            if (!i.length > 0) {
                                                return
                                            }
                                            let firstLetter = i[0].toUpperCase()
                                            let restOfsentence = i.slice(1, i.length)
                                            return (
                                                <ul key={key} style={{ textAlign: "left" }}>
                                                    <li style={{ padding: "5px 3px " }}>
                                                        {firstLetter + restOfsentence}
                                                    </li>
                                                </ul>
                                            )
                                        })}
                                    </Card>
                                </Grid>
                            )
                        }
                        )}
                    </Grid>
                </Container>

            </Container>
            {/* <Footer></Footer> */}
        </>
    )

}
export default UploadNotes