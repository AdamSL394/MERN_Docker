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
    const [look, setLook] = useState(false)
    const [gym, setGym] = useState(false)
    const [weed, setWeed] = useState(false)
    const [code, setCode] = useState(false)
    const [read, setRead] = useState(false)
    const [eatOut, setEatOut] = useState(false)
    const [basketball, setBasketball] = useState(false)
    const [clickedLooked, setClickLooked] = useState("hidden")
    const [clickedGym, setClickGym] = useState("hidden")
    const [clickedWeed, setClickWeed] = useState("hidden")
    const [clickedCode, setClickCode] = useState("hidden")
    const [clickedRead, setClickRead] = useState("hidden")
    const [clickedEatOut, setClickEatOut] = useState("hidden")
    const [clickedBasketball, setClickBasketball] = useState("hidden")

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
            "look": look,
            "gym": gym,
            "weed": weed,
            "code": code,
            "read": read,
            "eatOut": eatOut,
            "basketball": basketball,
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
                    if(gym){
                        setCodeIcon("Gym")
                    }
                    if(weed){
                        setCodeIcon("Smoke")
                    }
                    if(code){
                        setCodeIcon("Code")
                    }
                    if(read){
                        setCodeIcon("Read")
                    }
                    if(eatOut){
                        setCodeIcon("Eat Out")
                    }
                    if(basketball){
                        setCodeIcon("Basketball")
                    }
                    if(look){
                        setCodeIcon("Look")
                    }
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
            console.log("sdkjfsdf")
            if (cast.length < 1) {
                setNotes(cast)
                setnoNotes("No Notes for last week.")
                return
            }
            setNoteError("")
            setnoNotes("")
            setNotes(cast)
        }
        catch (error) {
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
                setNoteError("")
                setnoNotes("")
                setNotes(cast)
            }
        }
        catch (error) {
            setNoteError("Error Getting Notes")
        }
    }

    const setCodeIcon = (iconType) => {
        switch (iconType) {
            case "Look":
                if (look) {
                    setClickLooked("hidden")
                    setLook(false)

                } else {
                    setClickLooked("visible")
                    setLook(true)
                }
                break;
            case "Gym":
                if (gym) {
                    setClickGym("hidden")
                    setGym(false)

                } else {
                    setClickGym("visible")
                    setGym(true)
                }
                break;
            case "Smoke":
                if (weed) {
                    setClickWeed("hidden")
                    setWeed(false)

                } else {
                    setClickWeed("visible")
                    setWeed(true)
                }
                break;
            case "Code":
                if (code) {
                    setClickCode("hidden")
                    setCode(false)

                } else {
                    setClickCode("visible")
                    setCode(true)
                }
                break;
            case "Basketball":
                if (basketball) {
                    setClickBasketball("hidden")
                    setBasketball(false)

                } else {
                    setClickBasketball("visible")
                    setBasketball(true)
                }
                break;
            case "Eat Out":
                if (eatOut) {
                    setClickEatOut("hidden")
                    setEatOut(false)
                } else {
                    setClickEatOut("visible")
                    setEatOut(true)
                }
                break;
            case "Read":
                if (read) {
                    setClickRead("hidden")
                    setRead(false)

                } else {
                    setClickRead("visible")
                    setRead(true)
                }
                break;
            default:
                break;
        }
    }

    return (
        <Container id="container">
            <div className="formButtons">
                <Grid container spacing={1} justifyContent="space-between">
                    <Grid item xs={11} s={11} m={11} l={11} style={{ margin: "0" }}>
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
                    </Grid>
                    <Grid item xs={12} s={12} m={12} l={12} style={{ margin: "auto" }}>
                        <span>
                            <span
                                style={{ cursor: "pointer", marginBottom: "1rem", fontSize: "30px", marginRight: ".5rem" }}
                                onClick={() => setCodeIcon('Look')}
                                role="img"
                                aria-label="eyes"
                            >
                                👀
                            </span>
                            <span
                                role="img"
                                aria-label="checkmark"
                                style={{ visibility: clickedLooked, marginRight: ".5rem" }}
                            >✅</span>
                        </span>
                        <span>
                            <span
                                role="img"
                                aria-label="arm"
                                style={{ cursor: "pointer", marginBottom: "1rem", fontSize: "30px", marginRight: ".5rem" }}
                                onClick={() => setCodeIcon('Gym')}
                            >
                                💪🏼
                            </span>
                            <span
                                role="img"
                                aria-label="checkmark"
                                style={{ visibility: clickedGym, marginRight: ".5rem" }}
                            >✅</span>
                        </span>
                        <span>
                            <span
                                role="img"
                                aria-label="leaf"
                                style={{ cursor: "pointer", marginBottom: "1rem", fontSize: "30px", marginRight: ".5rem" }}
                                onClick={() => setCodeIcon('Smoke')}
                            >
                                🍁
                            </span>
                            <span
                                role="img"
                                aria-label="checkmark"
                                style={{ visibility: clickedWeed, marginRight: ".5rem" }}
                            >✅</span>
                        </span>

                        <span>
                            <span
                                style={{ cursor: "pointer", marginBottom: "1rem", fontSize: "30px", marginRight: ".5rem" }}
                                onClick={() => setCodeIcon('Code')}
                                role="img"
                                aria-label="computer guy"
                            >
                                👨🏻‍💻
                            </span>
                            <span
                                role="img"
                                aria-label="checkmark"
                                style={{ visibility: clickedCode, marginRight: ".5rem" }}
                            >✅</span>
                        </span>

                        <span>
                            <span
                                style={{ cursor: "pointer", marginBottom: "1rem", fontSize: "30px", marginRight: ".5rem" }}
                                onClick={() => setCodeIcon('Basketball')}
                                role="img"
                                aria-label="basketball"
                            >
                                ⛹🏻‍♂️
                            </span>
                            <span
                                role="img"
                                aria-label="checkmark"
                                style={{ visibility: clickedBasketball, marginRight: ".5rem" }}
                            >✅</span>
                        </span>
                        <span>
                            <span
                                role="img"
                                aria-label="pizza"
                                style={{ cursor: "pointer", marginBottom: "1rem", fontSize: "30px", marginRight: ".5rem" }}
                                onClick={() => setCodeIcon('Eat Out')}
                            >
                                🍕
                            </span>
                            <span
                                role="img"
                                aria-label="checkmark"
                                style={{ visibility: clickedEatOut, marginRight: ".5rem" }}
                            >✅</span>
                        </span>

                        <span>
                            <span
                                role="img"
                                aria-label="books"
                                style={{ cursor: "pointer", marginBottom: "1rem", fontSize: "30px", marginRight: ".5rem" }}
                                onClick={() => setCodeIcon('Read')}
                            >
                                📚
                            </span>
                            <span
                                role="img"
                                aria-label="checkmark"
                                style={{ visibility: clickedRead, marginRight: ".5rem" }}
                            >✅</span>
                            <span
                                role="img"
                                aria-label="checkmark"
                                style={{ cursor: "pointer", marginBottom: "1rem", fontSize: "30px", marginRight: ".5rem" }}
                                onClick ={() => {alert("Dropdown")}}
                            >➕</span>
                        </span>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} justifyContent="space-between">
                    <Grid item xs={6} s={6} m={6} l={6} style={{ marginTop: "0" }}>
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
                                style={{ width: "6.5rem", height: "3.2rem" }}
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
                    </Grid>
                    <Grid item xs={8} s={8} m={8} l={8} style={{ margin: "0" }}>
                        <Button
                            disabled={disabled}
                            style={{ alignSelf: "center" }}
                            variant="contained"
                            value="save"
                            color="primary"
                            onClick={() => storeNewNote(userId)}>
                            Save Note
                        </Button>
                    </Grid>
                </Grid>
            </div>
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
            <span style={{ float: "right !important" }}>
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
                                    <strong><span role="img"
                                        aria-label="checkmark"> ✨</span>'s:&nbsp; {note.star}</strong>
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

                                <div
                                    key={i + 105}
                                    style={{ borderTop: "1px solid #cbcbcb" }}
                                >
                                    <span  >{note.look ? <span role="img"
                                        aria-label="Eyes" style={{ backgroundColor: "lightgrey", marginRight: ".4rem", border: "2px lightgrey", borderRadius: "10px 10px 10px 10px",paddingLeft: "4px" }}> 👀 </span> : null}</span>
                                    <span>{note.gym ? <span role="img"
                                        aria-label="arm" style={{ backgroundColor: "#ffffff", marginRight: ".4rem", cursor: "pointer" }} >💪🏼 </span> : null} </span>


                                    <span>{note.weed ? <span role="img"
                                        aria-label="Leaf" style={{ backgroundColor: "#ffffff", marginRight: ".4rem", cursor: "pointer" }} >🍁 </span> : null} </span>



                                    <span >{note.code ? <span role="img"
                                        aria-label="Computer guy" style={{ backgroundColor: "#ffffff", marginRight: ".4rem", cursor: "pointer" }} >👨🏻‍💻 </span> : null} </span>


                                    <span>{note.read ? <span role="img"
                                        aria-label="Books" style={{ backgroundColor: "#ffffff", marginRight: ".4rem", cursor: "pointer" }} >📚 </span> : null} </span>

                                    <span >{note.eatOut ? <span role="img"
                                        aria-label="Pizza" style={{ backgroundColor: "#ffffff", marginRight: ".4rem", cursor: "pointer" }} >🍕 </span> : null} </span>

                                    <span >{note.basketball ? <span role="img"
                                        aria-label="Basketball" style={{ backgroundColor: "#ffffff", marginRight: ".4rem", cursor: "pointer" }} >⛹🏻‍♂️ </span> : null} </span>

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