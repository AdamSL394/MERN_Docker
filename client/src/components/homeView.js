import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField/index.js'
import FormControl from '@mui/material/FormControl/index.js';
import Select from '@mui/material/Select/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import Button from '@mui/material/Button/index.js';
import './homeView.css'
import Container from "@mui/material/Container/index.js";
import Card from "@mui/material/Card/index.js"
import Grid from "@mui/material/Grid/index.js"
import Alert from '@mui/material/Alert/index.js';
import NoteRoutes from "../router/noteRoutes.js";
import { useAuth0 } from '@auth0/auth0-react'
import enviromentAPI from '../config/config.js'
import Switch from '@mui/material/Switch/index.js';

const HomeView = () => {
    const { user } = useAuth0();
    const [noNotes, setnoNotes] = useState();
    const [noteError, setNoteError] = useState();
    const [text, setText] = useState()
    const [date, setDate] = useState()
    const [star, setStar] = useState(false)
    const [successFlag, setSuccessFlag] = useState("hidden")
    const [errorFlag, setErrorFlag] = useState("hidden")
    const userId = user.sub.split("|")[1]
    const [disabled, setDisabled] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [notes, setNotes] = useState([])
    const [checked, setChecked] = useState(true);
    const [noteview, setNoteView] = useState("weeks")


    const storeNewNote = (userId) => {
        setDisabled(true)
        var myHeaders = new Headers();
        myHeaders.append("origin", enviromentAPI.api_url);
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "text": text,
            "date": date,
            "star": star,
            "userId": userId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: raw
        };
        fetch(`${enviromentAPI.api_url}/users/note`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result.toString().includes("failed")) {
                    setErrorMessage(result)
                    setErrorFlag("visible")
                    setTimeout(() => { setErrorFlag("hidden") }, 1500);
                    setTimeout(() => { setDisabled(false) }, 1500);
                } else {
                    setText(" ");
                    setStar("None")
                    setSuccessMessage(result)
                    setSuccessFlag("visible")
                    setTimeout(() => { setSuccessFlag("hidden") }, 1500);
                    setTimeout(() => { setDisabled(false) }, 1500);
                }
            })
            .catch(error => {
                setErrorMessage(error)
                setErrorFlag("visible")
                setTimeout(() => { setErrorFlag("hidden") }, 1500);
                setTimeout(() => { setDisabled(false) }, 1500);
            });
    }

    useEffect(() => {
        const userid = user.sub.split("|")[1]
        let todaysDate = new Date().toISOString().split("T")[0]

        var myCurrentDate = new Date();
        var myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 7)

        let lastWeeksDate = myPastDate.toISOString().split("T")[0];
        getNoteRanges(userid, todaysDate, lastWeeksDate)
    }, [])

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (!checked) {
            const userid = user.sub.split("|")[1]
            let todaysDate = new Date().toISOString().split("T")[0]

            var myCurrentDate = new Date();
            var myPastDate = new Date(myCurrentDate);
            myPastDate.setDate(myPastDate.getDate() - 7)

            let lastWeeksDate = myPastDate.toISOString().split("T")[0];
            getNoteRanges(userid, todaysDate, lastWeeksDate)
            setNoteView("weeks")
        }
        if (checked) {
            getNoteRangeYear()
            setNoteView("year")
        }
    };

    const getNoteRanges = async (userid, todaysDate, lastWeeksDate) => {
        try {
            const res = await NoteRoutes.getNoteRange(userid, todaysDate, lastWeeksDate)
            let cast = JSON.parse(res)
            if (cast.length < 1) {
                setnoNotes("No Notes for last week.")
                return
            }
            setnoNotes("")
            setNotes(cast)
        }
        catch (error) {
            console.log("herae", error)
            setNoteError("Error Getting Notes")
        }
    }

    const getNoteRangeYear = async () => {
        const userid = user.sub.split("|")[1]
        const date = new Date();
        const futureDay = date.getDate() + 7;
        const day = date.getDate()
        const year = date.getFullYear() - 1;
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month
        }
        const weekAheadLastYear = year + '-' + month + '-' + futureDay
        const todayLastYear = year + '-' + month + '-' + day
        try {


            const res = await NoteRoutes.getNoteRangeYear(userid, weekAheadLastYear, todayLastYear)
            if (res) {
                const cast = JSON.parse(res)
                // let a = cast.sort((a, b) => {
                //     console.log(a.date,b.date)
                //     return a.date < b.date
                // })
                // console.log(a)
                setNotes(cast)
            }
        }
        catch (error) {
            setNoteError("Error Getting Notes")
        }
    }

    return (
        <Container id="container">
            <span className="formButtons">


                <TextField
                    autoFocus={true}
                    multiline rows={7}
                    label="Note"
                    id="fullWidth"
                    color="primary"
                    placeholder="Note"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{ overflowY: "auto", overflow: "visible" }}
                >
                </TextField>

                <input
                    id="date"
                    type="date" placeholder="Date" defaultValue={date} onChange={e => setDate(e.target.value)}
                    style={{ alignSelf: "center" }}>
                </input>
                <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    size="medium"
                    style={{ alignSelf: "center", borderRadius: "5px 5px 5px 5px" }}>
                    <span
                        style={{ position: "absolute", margin: "2px", }}>
                        <i>Star</i>
                    </span>
                    <InputLabel
                        id="demo-select-small"
                        style={{ alignSelf: "center" }}
                    >
                    </InputLabel>
                    <Select
                        defaultValue=""
                        labelId="demo-select-small"
                        id="demo-select-small"
                        onChange={e => setStar(e.target.value)}
                    >
                        <MenuItem value={"None"} >
                            <em>None</em>
                        </MenuItem>
                        <MenuItem
                            value={"1"}>
                            <span
                                role="img"
                                aria-label="Star"
                            >
                                🌟
                            </span>
                        </MenuItem>
                        <MenuItem
                            value={"2"}>
                            <span
                                role="img"
                                aria-label="Star"
                            >
                                🌟🌟
                            </span>
                        </MenuItem>
                        <MenuItem
                            value={"3"}>
                            <span
                                role="img"
                                aria-label="Star"
                            >
                                🌟🌟🌟
                            </span>
                        </MenuItem>
                    </Select>
                </FormControl>
                <Button
                    disabled={disabled}
                    style={{ alignSelf: "center" }}
                    variant="contained"
                    value="save"
                    color="primary"
                    onClick={() => storeNewNote(userId)}>
                    Save Note
                </Button>
            </span>
            <Alert
                severity="success"
                style={{ visibility: successFlag, marginTop: "1%" }}
                id="successFlag"
                open={false} >
                {successMessage}
            </Alert>
            <Alert
                severity="error"
                style={{ visibility: errorFlag }}
                open={false}>
                {errorMessage}
            </Alert>
            <span style={{float:"right !important"}}>
            <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                id="switch"
                
                label="Label"
            />
            </span>
            <h2 id="pastNoteHeader">Last {noteview} notes</h2>
            <h3 id="pastNoteHeader">{noNotes}</h3>
            <h3 id="pastNoteError">{noteError}</h3>
            <Grid
                container spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                {(notes).map((note, i) => {
                    return (
                        <Grid
                            alignItems="flex-start"
                            key={i + 101}
                            item xs={12} sm={6} md={4} lg={3}>
                            <Card
                                key={i + 102}
                                style={{ marginBottom: "2%" }}
                                variant="outlined"
                            >
                                <div
                                    key={i + 104}
                                    style={{ marginBottom: "5%", borderBottom: "1px solid #cbcbcb" }}
                                >
                                    <span style={{ marginRight: "12%" }}> <strong>{note.date}</strong></span>
                                    <strong> ✨'s:&nbsp; {note.star}</strong>
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
        </Container >

    )
}


export { HomeView };