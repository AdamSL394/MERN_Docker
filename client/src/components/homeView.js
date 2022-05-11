import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField/index.js'
import FormControl from '@mui/material/FormControl/index.js';
import Select from '@mui/material/Select/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import Button from '@mui/material/Button/index.js';
import './homeView.css'
import { Container, Card, Grid } from "@mui/material/index.js";
import Alert from '@mui/material/Alert/index.js';
import NoteRoutes from "../router/noteRoutes.js";
import { useAuth0 } from '@auth0/auth0-react'
import {enviromentAPI} from '../router/noteRoutes.js'

function HomeView() {
    const { user } = useAuth0();
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


    const storeNewNote = (userId) => {
        setDisabled(true)
        // var myHeaders = new Headers();
        // myHeaders.append("origin", "http://localhost:3000");
        // myHeaders.append("X-Requested-With", "XMLHttpRequest");
        // myHeaders.append("Content-Type", "application/json");
        // var raw = JSON.stringify({
        //     "text": text,
        //     "date": date,
        //     "star": star,
        //     "userId": userId
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     redirect: 'follow',
        //     requireHeader: ['origin', 'x-requested-with'],
        //     body: raw
        // };

        // fetch(`${enviromentAPI.api_url}/users/note`, requestOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         if (result.toString().includes("failed")) {
        //             setErrorMessage(result)
        //             setErrorFlag("visible")
        //             setTimeout(() => { setErrorFlag("hidden") }, 1500);
        //             setTimeout(() => { setDisabled(false) }, 1500);
        //         } else {
        //             setText(" ");
        //             setStar("None")
        //             setSuccessMessage(result)
        //             setSuccessFlag("visible")
        //             setTimeout(() => { setSuccessFlag("hidden") }, 1500);
        //             setTimeout(() => { setDisabled(false) }, 1500);
        //         }
        //     })
        //     .catch(error => {
        //         setErrorMessage(error)
        //         setErrorFlag("visible")
        //         setTimeout(() => { setErrorFlag("hidden") }, 1500);
        //         setTimeout(() => { setDisabled(false) }, 1500);
        //     });
    }

    useEffect(() => {
        const userid = user.sub.split("|")[1]
        let todaysDate = new Date().toISOString().split("T")[0]

        var myCurrentDate = new Date();
        var myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 7)

        let lastWeeksDate = myPastDate.toISOString().split("T")[0]
        getNoteRanges(userid, todaysDate, lastWeeksDate)

    }, [])

    const getNoteRanges = (userid, todaysDate, lastWeeksDate) => {
        try {
            NoteRoutes.getNoteRange(userid, todaysDate, lastWeeksDate).then((res) => {
                let cast = JSON.parse(res)
                console.log(cast)
                setNotes(cast)
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Container id="container">
            <TextField multiline rows={3} defaultValue={""} fullWidth label="Note" id="fullWidth" color="primary" placeholder="Note" value={text} onChange={e => setText(e.target.value)}
            ></TextField>
            <span className="formButtons">
                <input id="date" type="date" placeholder="Date" defaultValue={date} onChange={e => setDate(e.target.value)} style={{ alignSelf: "center" }}>
                </input>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium" style={{ alignSelf: "center" }}>
                    <span style={{ position: "absolute", margin: "2px" }}><i>Star</i></span>
                    <InputLabel id="demo-select-small" style={{ alignSelf: "center" }}></InputLabel>
                    <Select
                        defaultValue=""
                        labelId="demo-select-small"
                        id="demo-select-small"
                        onChange={e => setStar(e.target.value)}
                    >
                        <MenuItem value={"None"} >
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"1"}><span role="img" aria-label="Star">🌟</span></MenuItem>
                        <MenuItem value={"2"}><span role="img" aria-label="Star">🌟🌟</span></MenuItem>
                        <MenuItem value={"3"}><span role="img" aria-label="Star">🌟🌟🌟 </span></MenuItem>
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
            <Alert severity="success" style={{ visibility: successFlag }} id="successFlag" open={false} >{successMessage}</Alert>
            <Alert severity="error" style={{ visibility: errorFlag }} open={false}>{errorMessage}</Alert>
            <h2 id="pastNoteHeader">Last Weeks Notes</h2>
            <Grid
                container spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >

                {(notes).map((note, i) => {
                    return (
                        <Grid
                            item xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <h3
                                    key={i + 103}
                                    style={{ margin: "1%" }}
                                >
                                    {note.text}
                                </h3>
                                <div
                                    key={i + 104}
                                >
                                    {note.date}
                                </div>
                                <div
                                    key={i + 105}
                                >
                                    {note.star}
                                </div>
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