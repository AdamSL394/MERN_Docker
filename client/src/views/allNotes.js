import React, { useEffect, useState } from "react";
import Navbar from "../components/nav";
import { Card, Button, Grid } from "@mui/material/"



export default function AllNotes() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        getAllNotes()
    }, [])

    const getAllNotes = () => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "http://localhost:3000/");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({});

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/users/all", requestOptions)
            .then(response => response.text())
            .then(async results => {
                let cast = JSON.parse(results)
                setNotes(cast)
            })
            .catch(error => console.log('error', error));
    }

    const deleteNote = (note) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "http://localhost:3000/");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/users/delete/${note._id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                getAllNotes()
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <Navbar></Navbar>
            <Grid container spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                {(notes).map((note, i) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card key={i}
                                value={note.id}
                                variant="outlined"
                            >
                                <span>{note.text}</span>
                                <div>{note.date}</div>
                                <div>{note.star}</div>
                                <button
                                    onClick={() => deleteNote(note)}
                                    color="primary"
                                >
                                    Delete me
                                </button>
                            </Card>
                        </Grid>
                    )
                })}

            </Grid>
        </>
    )
}