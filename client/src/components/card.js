import React, { useState } from "react";
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './card.css'
import { Container } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useAuth0 } from '@auth0/auth0-react'



function Card() {

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

    const storeNewNote = (userId) => {
        setDisabled(true)
        var myHeaders = new Headers();
        myHeaders.append("origin", "");
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

        fetch("http://localhost:5000/users/note", requestOptions)
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
        </Container>

    )
}


export { Card };