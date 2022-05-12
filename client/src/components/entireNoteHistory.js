import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card/index.js"
import Button from "@mui/material/Button/index.js"
import Grid from "@mui/material/Grid/index.js"
import Box from "@mui/material/Box/index.js"
import Modal from "@mui/material/Modal/index.js"
import FormControl from "@mui/material/FormControl/index.js"
import Select from "@mui/material/Select/index.js"
import InputLabel from "@mui/material/InputLabel/index.js"
import MenuItem from "@mui/material/MenuItem/index.js"
import Container from "@mui/material/Container/index.js"
import { useAuth0 } from '@auth0/auth0-react'
import NoteRoutes from "../router/noteRoutes.js";
import Search from './search.js'


function NoteHistory() {

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
        textAlign: "center"
    };

    // let warningText = "Please save notes"
    const { user } = useAuth0();
    const [notes, setNotes] = useState([])
    const [open, setOpen] = useState(false);
    const [modelNoteId, setModelNoteId] = useState()
    const userId = user.sub.split("|")[1]
    const [disabled, setDisabled] = useState(false)
    const [ordered, setOrdered] = useState(false)
    const [modalText, setmodalText] = useState("")



    const handleOpen = (note) => {
        if (note.edit === true) {
            setmodalText("Cancel")
        }
        if (note.edit === false) {
            setmodalText("Delete")
        }
        setModelNoteId(note._id)
        setOpen(true)
    };

    const closeModal = (id) => {
        setOpen(false)
    }

    const handleClose = (n) => {
        if (modalText === "Delete") {
            setOpen(false)
            NoteRoutes.deleteNote(n).then((res) => {
                getAllNotes(userId)
            })
        }
        if (modalText === "Cancel") {
            NoteRoutes.getNote(n).then((res) => {
                setOpen(false)
                let cast = JSON.parse(res)
                for (let note of notes) {
                    if (note._id === cast[0]._id) {
                        note.text = cast[0].text
                        note.date = cast[0].date
                        note.star = cast[0].star
                        note.edit = false
                        setNotes([...notes])
                    }
                }
            })

        }
    };

    useEffect(() => {
        const userid = user.sub.split("|")[1]
        getAllNotes(userid)
    }, [])

    const getAllNotes = (userId) => {
        try {
            NoteRoutes.getAllNotes(userId).then((res) => {
                setNotes(res)
                for (let key of res) {
                    if (key.edit === true) {
                        setDisabled(true)
                        return
                    }
                }
                setDisabled(false)
                return
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    const updateNote = (note) => {
        NoteRoutes.updateNote(note).then((res) => {
            if (ordered) {
                let cast = JSON.parse(res)
                for (let note of notes) {
                    if (note._id === cast._id) {
                        note.text = cast.text
                        note.date = cast.date
                        note.star = cast.star
                        setNotes([...notes])
                    }
                }
                for (let key of notes) {
                    if (key.edit === true || cast.edit === true) {
                        setDisabled(true)
                        return
                    }
                }
                setDisabled(false)
                return
            } else {
                getAllNotes(userId)
            }
        })
    }

    const checkSavedNotes = () => {
        let unSavedNotes = Object.keys(sessionStorage)
        let i = unSavedNotes.length
        while (i--) {
            let storedEditNotes = JSON.parse(sessionStorage.getItem(unSavedNotes[i]))
            if (storedEditNotes.edit === true) {
                NoteRoutes.updateNote(storedEditNotes).then((res) => {
                    console.log(res)
                })
            }
        }
        getAllNotes(userId)
        return
    }

    const saveNote = (note) => {
        let updatedNote = JSON.parse(sessionStorage.getItem(note._id));

        if (ordered) {
            note.edit = false;

        }

        if (updatedNote != null) {
            if (updatedNote.edit) {
                updatedNote.edit = false
                sessionStorage.setItem(updatedNote._id, JSON.stringify(updatedNote))
                updateNote(updatedNote)
            }
        }
        else {
            note.edit = false
            sessionStorage.setItem(note._id, JSON.stringify(note))
            updateNote(note)
        }
    }

    const editNote = (note) => {
        setDisabled(true)
        if (!note.edit) {
            note.edit = true
        }
        sessionStorage.setItem(note._id, JSON.stringify(note))
        updateNote(note)
    }

    const onStarValueChange = (e, note) => {
        let updatedNote = JSON.parse(sessionStorage.getItem(note._id));
        let newNote;
        if (updatedNote) {
            newNote = {
                "text": updatedNote.text,
                "date": updatedNote.date,
                "star": e.target.value,
                "_id": updatedNote._id,
                "edit": updatedNote.edit
            }
        }
        else {
            newNote = {
                "text": note.text,
                "date": note.date,
                "star": e.target.value,
                "_id": note._id,
                "edit": note.edit
            }
        }
        sessionStorage.setItem(note._id, JSON.stringify(newNote));
    }

    const onChangeTextArea = (e, note) => {
        let updatedNote = JSON.parse(sessionStorage.getItem(note._id));
        let newNote;
        if (e.target.localName === "input") {
            if (updatedNote) {
                newNote = {
                    "text": updatedNote.text,
                    "date": e.target.value,
                    "star": updatedNote.star,
                    "_id": updatedNote._id,
                    "edit": updatedNote.edit
                }
            }
            else {
                newNote = {
                    "text": note.text,
                    "date": e.target.value,
                    "star": note.star,
                    "_id": note._id,
                    "edit": note.edit
                }
            }
            sessionStorage.setItem(note._id, JSON.stringify(newNote));
        } else {
            if (updatedNote) {
                newNote = {
                    "text": e.target.value,
                    "date": updatedNote.date,
                    "star": updatedNote.star,
                    "_id": updatedNote._id,
                    "edit": updatedNote.edit
                }
            }
            else {
                newNote = {
                    "text": e.target.value,
                    "date": note.date,
                    "star": note.star,
                    "_id": note._id,
                    "edit": note.edit
                }
            }
            sessionStorage.setItem(note._id, JSON.stringify(newNote));
        }
    }

    const getOrderedNotes = (userId) => {
        NoteRoutes.getNotesOrdered(userId).then((res) => {
            setNotes(res)
            setOrdered(true)
        })
    }

    return (
        <>
            <Container style={{ paddingBottom: "3%" }}>
                <Search></Search>
                <Button
                    disabled={disabled}
                    id="Orderby"
                    onClick={() => { getOrderedNotes(userId) }}
                >
                    Order By Date
                </Button>
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
                                Are you sure you'd like to {modalText}?
                            </div>
                            <Button style={{ color: "red" }} onClick={() => closeModal()}>Close</Button>
                            <Button style={{ color: "red" }} onClick={() => handleClose(modelNoteId)}>{modalText}</Button>
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
                                            value={note.id}
                                            onClick={() => handleOpen(note)}
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
                                            key={i + 104}
                                        >
                                            {note.date}
                                        </div>
                                        <div
                                            key={i + 105}
                                        >
                                            {note.star}
                                        </div>

                                        <Button
                                            key={i + 106}
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
                                        onClick={() => handleOpen(note)}
                                        color="primary"
                                        id="deleteButton"
                                    >
                                        X
                                    </Button>
                                    <textarea
                                        style={{ width: "94%", fontSize: "medium" }}
                                        key={i + 4}
                                        id="editCard"
                                        onChange={
                                            (e) => onChangeTextArea(e, note)
                                        }
                                    >
                                        {note.text}
                                    </textarea>
                                    <div
                                        style={{
                                            marginTop: "3%", float: "left",
                                            marginLeft: "5%"
                                        }}
                                        id="dateInput">
                                        <input
                                            onChange={e => { onChangeTextArea(e, note) }}
                                            key={i + 5}
                                            type="date"
                                            defaultValue={note.date}
                                        >

                                        </input>
                                    </div>

                                    <FormControl sx={{ m: 1, minWidth: 90 }} size="medium" style={{ alignSelf: "center" }}>
                                        <span style={{ position: "absolute", margin: "2px" }}><i>Star</i></span>
                                        <InputLabel id="demo-select-small" style={{ alignSelf: "center" }}></InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            onChange={e => onStarValueChange(e, note)}
                                            defaultValue={note.star}
                                        >
                                            <MenuItem value={"None"} >
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={"1"}><span role="img" aria-label="Star">🌟</span></MenuItem>
                                            <MenuItem value={"2"}><span role="img" aria-label="Star">🌟🌟</span></MenuItem>
                                            <MenuItem value={"3"}><span role="img" aria-label="Star">🌟🌟🌟 </span></MenuItem>
                                        </Select>
                                    </FormControl>

                                    <div>
                                        <Button
                                            key={i + 6}
                                            onClick={() => saveNote(note)}
                                        >
                                            Save Me
                                        </Button>
                                    </div>
                                </Card>
                            </Grid>
                        )
                    }
                    )}
                </Grid>
            </Container>
        </>
    )
}

export default NoteHistory