import React, { useEffect, useState } from "react";
import Navbar from "../components/nav";
import { Card, Button, Grid, Box, Modal } from "@mui/material/"
import Footer from "../components/footer";
import styles from "./allNotes.css"
import { useAuth0 } from '@auth0/auth0-react'


export default function AllNotes() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign:"center"
    };

    const { user } = useAuth0();
    const [notes, setNotes] = useState([])
    const [text, setText] = useState("")
    const [open, setOpen] = useState(false);
    const [modelNoteId, setModelNoteId] = useState()
    const userId = user.sub.split("|")[1]

    const handleOpen = (noteId) => {
        setModelNoteId(noteId._id)
        setOpen(true)
    };
    const handleClose = (id) => {
        if(id){
            setOpen(false)
            deleteNote(id)
        }
        setOpen(false)
    };


    useEffect(() => {
        getAllNotes(userId)
    }, [])
 
    const getAllNotes = (userId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "http://localhost:3000/");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`http://localhost:5000/users/all/${userId}`, requestOptions)
            .then(response => response.text())
            .then(async results => {
                let cast = JSON.parse(results)
                setNotes(cast)
            })
            .catch(error => console.log('error', error));
    }

    const deleteNote = (noteId) => {
        var myHeaders = new Headers();
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("origin", "http://localhost:3000/");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/users/delete/${noteId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                getAllNotes(userId)
            })
            .catch(error => console.log('error', error));
    }

    const editNote = (note) => {
        if (!note.edit) {
            note.edit = true
            note.text = note.text
        }
        else {
            note.edit = false
            if (text === "")
                note.text = note.text
            else {
                note.text = text
                setText("")
            }
        }
        console.log(note)
        updateNote(note)
    }

    const updateNote = (note) => {
        var myHeaders = new Headers();
        myHeaders.append("origin", "");
        myHeaders.append("X-Requested-With", "XMLHttpRequest");
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "text": text,
            "date": note.date,
            "star": note.star,
            "edit": note.edit
        });

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            redirect: 'follow',
            requireHeader: ['origin', 'x-requested-with'],
            body: raw
        };

        fetch(`http://localhost:5000/users/update/${note._id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                console.log("here", result);
                getAllNotes(userId)
            })
            .catch(error => {
                //setErrorFlag("visible")
                console.log('error', error)

            });
    }


    return (
        <> 
            <Navbar></Navbar>
            {/* style={{ backgroundColor: "lightgray" }} */}
            <Box >
                <Grid
                    style={{ width: "90% !important" }}
                    container spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >

                    <Modal
                        open={open}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={style}>
                            <div>
                                Are you sure you'd like to delete?
                            </div>
                            <Button style={{color:"red"}} onClick={()=>handleClose()}>Close</Button>
                            <Button style={{color:"red"}} onClick={() => handleClose(modelNoteId)}>Delete</Button>
                        </Box>
                    </Modal>
                    {(notes).map((note, i) => {
                        if (!note.edit) {
                            return (
                                <Grid key={i + 100} item xs={12} sm={6} md={4} lg={3}>
                                    <Card key={i + 110}
                                        id="Card"
                                        value={note.id}
                                        variant="outlined"
                                    >
                                        <Button
                                            key={i + 102}
                                            id="deleteButton"
                                            value = {note.id}
                                            onClick={()=>handleOpen(note)}
                                        >
                                            X
                                        </Button>
                                        <h3
                                            key={i + 103}
                                            style={{ margin: "1%", cursor: "pointer" }}
                                            onClick={() => editNote(note)}
                                        >
                                            {note.text}
                                        </h3>
                                        <div
                                        key={i+104}
                                        >
                                            {note.date}
                                        </div>
                                        <div
                                        key={i+105}
                                        >
                                            {note.star}
                                        </div>

                                        <Button
                                            key={i+106}
                                            onClick={() => editNote(note)}>
                                            Edit Me
                                        </Button>
                                    </Card>
                                </Grid>
                            )
                        }
                        return (
                            <Grid key={i + 1} item xs={12} sm={6} md={4} lg={3}>
                                <Card key={i + 2}
                                    value={note.id}
                                    variant="outlined"
                                    id="Card"
                                >
                                    <Button
                                        key={i + 3}
                                        onClick={()=>handleOpen(note)}
                                        color="primary"
                                        id="deleteButton"
                                    >
                                        X
                                    </Button>
                                    <textarea
                                        key={i + 4}
                                        id="editCard"
                                        onChange={(e) => setText(e.target.value)}
                                        value={note.text}
                                    >
                                    </textarea>
                                    <input
                                        key={i + 5}
                                        type="date">
                                    </input>
                                    <Button
                                        key={i + 6}
                                        onClick={() => editNote(note)}
                                    >
                                        Save Me
                                    </Button>
                                </Card>
                            </Grid>
                        )
                    }
                    )}
                    <Footer></Footer>
                </Grid>
            </Box>
        </>
    )
}