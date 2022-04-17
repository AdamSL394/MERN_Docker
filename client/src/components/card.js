import React, { useState } from "react";
import logo from './volk.jpg'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './card.css'
import { Container } from "@mui/material";



function Card() {

    const [text, setText] = useState()
    const [date, setDate] = useState()
    const [star, setStar] = useState(false)

    const storeNewNote = () => {
        console.log(text,date,star)
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

        fetch("http://localhost:5000/note", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const onKeyDown = (e) => {
        console.log(e.code)
        if (e.code === "ShiftRight") {
            console.log(e.code)
            e.preventDefault();
            setText("hello ");
        }
    }

    return (
        <Container id="container">
            <TextField onKeyDown={onKeyDown} fullWidth label="Note" id="fullWidth" color="primary" placeholder="Note" defaultValue={text} onChange={e => setText(e.target.value)}
            ></TextField>
            <input id="date" type="date" placeholder="Date" defaultValue={date} onChange={e => setDate(e.target.value)}>
            </input>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                <InputLabel id="demo-select-small">Star</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                >
                    <MenuItem value={star}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={false}></MenuItem>
                    <MenuItem value={true}>🌟</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                value="save"
                color="primary"
                onClick={() => storeNewNote()}>
                Save Note
            </Button>
        </Container>
    )
}


export { Card };