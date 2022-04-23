import React, { useState } from "react";
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './card.css'
import { Container } from "@mui/material";
import Alert from '@mui/material/Alert';



function Card() {

    const [text, setText] = useState()
    const [date, setDate] = useState()
    const [star, setStar] = useState(false)
    const [successFlag, setSuccessFlag] = useState("hidden")
    const [errorFlag, setErrorFlag] = useState("hidden")
    const val = "Line1\nLine2";

    const storeNewNote = () => {
        console.log(text, date, star)
        var myHeaders = new Headers();
        myHeaders.append("origin", "");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "text": text,
            "date": date,
            "star": star
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
                console.log(result);
                console.log("here",result);
                setText(" ");
                setDate();
                setStar("None")
                setSuccessFlag("visible")
            })
            .catch(error => {
                setErrorFlag("visible")
                console.log('error', error)
        
        });
    }


    return (
        <Container id="container">
            <TextField  multiline rows={3} defaultValue={""} fullWidth label="Note" id="fullWidth" color="primary" placeholder="Note" value={text} onChange={e => setText(e.target.value)}
            ></TextField>
            <span className="formButtons">
            <input id="date" type="date" placeholder="Date" defaultValue={date} onChange={e => setDate(e.target.value)} style={{alignSelf: "center"}}>
            </input>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="medium" style={{alignSelf: "center"}}>
                <span style={{position: "absolute", margin:"2px"}}><i>Star</i></span>
                <InputLabel id="demo-select-small" style={{alignSelf: "center"}}></InputLabel>
                <Select
                    defaultValue="false"
                    labelId="demo-select-small"
                    id="demo-select-small"
                    onChange={e => setStar(e.target.value)}
                >
                    <MenuItem value={"None"} >
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"1"}>🌟</MenuItem>
                    <MenuItem value={"2"}>🌟🌟</MenuItem>
                    <MenuItem value={"3"}>🌟🌟🌟</MenuItem>
                </Select>
            </FormControl>
            <Button
             style={{alignSelf: "center"}}
                variant="contained"
                value="save"
                color="primary"
                onClick={() => storeNewNote()}>
                Save Note
            </Button>
            </span>
            <Alert severity="success"  style={{visibility:successFlag}} open={false} >Success</Alert>
            <Alert severity="error"  style={{visibility:errorFlag}} open={false}>Error</Alert>
        </Container>

    )
}


export { Card };