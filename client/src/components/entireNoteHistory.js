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
import NoteRoutes from "../router/noteRoutes.js"
import Search from './search.js'
import Pagination from '@mui/material/Pagination/index.js'
import Stack from '@mui/material/Stack/index.js'


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

    let startingSearchDate = new Date()
    const { user } = useAuth0();
    const [noNotes, setnoNotes] = useState();
    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);
    const [modelNoteId, setModelNoteId] = useState();
    const userId = user.sub.split("|")[1];
    const [disabled, setDisabled] = useState(false);
    const [ordered, setOrdered] = useState(false);
    const [modalText, setmodalText] = useState("");
    const [numberOfPages, setNumberOfPages] = useState(0);
    let [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostsPerPage] = useState(20);
    const [startDate, setStartDate] = useState(startingSearchDate.toISOString().split("T")[0])
    const [endDate, setEndDate] = useState()


    const handleChange = (event, value) => {
        if (ordered === true) {
            setCurrentPage(value);
            getOrderedNotes(value);
            return
        }
        setCurrentPage(value);
        getAllNotes(value);
    };

    const handleOpen = (note) => {
        if (note.edit === true) {
            setmodalText("Cancel");
        }
        if (note.edit === false) {
            setmodalText("Delete");
        }
        setModelNoteId(note._id);
        setOpen(true);
    };

    const closeModal = (id) => {
        setOpen(false);
    }

    const handleClose = async (note) => {
        if (modalText === "Delete") {
            setOpen(false);
            const deletedNote = await NoteRoutes.deleteNote(note);
            getAllNotes(currentPage);
        }
        if (modalText === "Cancel") {
            let cancelNote = await NoteRoutes.getNote(note);
            setOpen(false);
            let cast = JSON.parse(cancelNote);
            for (let note of notes) {
                if (note._id === cast[0]._id) {
                    note.text = cast[0].text
                    note.date = cast[0].date
                    note.star = cast[0].star
                    note.edit = false
                    setNotes([...notes]);
                    NoteRoutes.updateNote(note);
                }
            } for (let key of notes) {
                if (key.edit === true || cast.edit === true) {
                    setDisabled(true);
                    return
                }
            }
            setDisabled(false);
            return
        }
    };

    useEffect(() => {
        getAllNotes();
    }, [])

    const getAllNotes = async (value) => {
        if (value) {
            currentPage = value
        }
        try {
            const userid = user.sub.split("|")[1];
            const getNotes = await NoteRoutes.getAllNotes(userid);
            if (getNotes.length < 1) {
                setnoNotes("Get started... Upload or make your first Note!")
                setNotes([])
                return
            }
            setnoNotes("")
            for (let note of getNotes) {
                if (note.edit === true) {
                    setDisabled(true);

                    break;
                }
                else { setDisabled(false) }
            }

            const indexOfLastPost = currentPage * postPerPage; //1 - 20
            const indexOfFirstPost = indexOfLastPost - postPerPage;
            const currentPosts = getNotes.slice(indexOfFirstPost, indexOfLastPost);
            setNotes(currentPosts);
            setNumberOfPages(Math.ceil(getNotes.length / postPerPage));
        } catch (e) {
            console.log("error", e.message)
        }
    }

    const updateNote = (note) => {
        NoteRoutes.updateNote(note).then((res) => {
            if (ordered) {
                let cast = JSON.parse(res);
                for (let note of notes) {
                    if (note._id === cast._id) {
                        note.text = cast.text
                        note.date = cast.date
                        note.star = cast.star
                        setNotes([...notes]);
                    }
                }

                for (let key of notes) {
                    if (key.edit === true || cast.edit === true) {
                        setDisabled(true);
                        return
                    }
                }
                setDisabled(false);
                return
            } else {
                getAllNotes(currentPage);
            }
        })
    }

    const checkSavedNotes = () => {
        let unSavedNotes = Object.keys(sessionStorage);
        let i = unSavedNotes.length;
        while (i--) {
            let storedEditNotes = JSON.parse(sessionStorage.getItem(unSavedNotes[i]));
            if (storedEditNotes.edit === true) {
                NoteRoutes.updateNote(storedEditNotes).then((res) => {
                    console.log(res);
                })
            }
        }
        getAllNotes(userId);
        return
    }

    const saveNote = (note) => {
        let updatedNote = JSON.parse(sessionStorage.getItem(note._id));
        if (ordered) {
            note.edit = false;
        }
        if (updatedNote != null) {
            if (updatedNote.edit) {
                updatedNote.edit = false;
                sessionStorage.setItem(updatedNote._id, JSON.stringify(updatedNote));
                updateNote(updatedNote);
            }
        }
        else {
            note.edit = false
            sessionStorage.setItem(note._id, JSON.stringify(note));
            updateNote(note);
        }
    }

    const editNote = (note) => {
        setDisabled(true);
        if (!note.edit) {
            note.edit = true;
        }
        sessionStorage.setItem(note._id, JSON.stringify(note));
        updateNote(note);
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

    const getOrderedNotes = (value) => {
        if (value) {
            currentPage = value;
        }
        const userId = user.sub.split("|")[1];
        NoteRoutes.getNotesOrdered(userId).then((res) => {
            if (res.length < 1) {
                setnoNotes(["Get started... Upload or make your first Note!"])
                return
            }
            const indexOfLastPost = currentPage * postPerPage;
            const indexOfFirstPost = indexOfLastPost - postPerPage;
            const currentPosts = res.slice(indexOfFirstPost, indexOfLastPost);
            setNotes(currentPosts);
            setNumberOfPages(Math.ceil(res.length / postPerPage));
            setOrdered(true);
        });
    }

    const handleCallBack = (searchedNotes, searchTeam) => {
        if (searchTeam.length === 0) {
            if (ordered) {
                getOrderedNotes(currentPage)
                return
            }
            getAllNotes(currentPage)
            return
        }
        setNotes(searchedNotes)
        return
    }

    const getNoteRange = async (userId,start,end) => {
        if(start > end){
            console.log("error")
        }
        if(!start){
            console.log("Please Pick a Starting Date")
        }
        const resp = await NoteRoutes.getNoteRange(userId,end,start)
        let cast = JSON.parse(resp)
        let c = cast.sort((a,b)=> {
            return a.date>b.date
        })
        setNotes(c)
    }

    const setStartSearch= (e)=> {
        setStartDate(e.target.value)
        if(endDate){
            getNoteRange(userId,e.target.value,endDate)
        }
    }

    const runDateSearch = (e) => {
        let end = e.target.value
        setEndDate(e.target.value)
        getNoteRange(userId,startDate,end)
    }

    return (
        <>
            <Container style={{ paddingBottom: "3%", marginTop: ".5%" }}>
                <Search style={{ alignItems: "center" }} parentCallback={handleCallBack}>
                </Search>
                <input type="date" defaultValue={startDate} onChange={e => setStartSearch(e)}
                 style={{height: "1.4rem", marginLeft:"2rem"}}
                ></input>
                <input type="date"
                defaultValue={endDate} onChange={e => runDateSearch(e)}
                style={{height: "1.4rem",marginLeft:"2rem"}}
                ></input>

                <Button
                    disabled={disabled}
                    id="Orderby"
                    onClick={() => { getOrderedNotes() }}
                >
                    Order By Date
                </Button>
                <Stack spacing={2} style={{ alignItems: "center", margin: "1rem" }}>
                    <Pagination
                        page={currentPage}
                        count={numberOfPages}
                        onChange={handleChange}
                        defaultPage={1}
                        color="primary"
                    ></Pagination>
                </Stack>
                <div id="noNotes" style={{ textAlign: "center", width: "100%", fontSize: "x-large" }}>
                    {noNotes}
                </div>
                <Grid
                    style={{ width: "90% !important" }}
                    container spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
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
                                    <Card
                                        style={{ marginBottom: "2%" }}
                                        key={i + 110}
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
                                            <strong>X</strong>
                                        </Button>
                                        <span style={{ float: "left", cursor: "pointer" }}
                                            onClick={() => editNote(note)}
                                        >🖊</span>
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
                        return (
                            <Grid key={i + 1} item xs={12} sm={6} md={4} lg={3}>
                                <Card
                                    key={i + 2}
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
                                        <strong>X</strong>
                                    </Button>

                                    <div
                                        style={{
                                            marginLeft: "5%"
                                        }}
                                        id="dateInput">
                                        <input
                                            onChange={e => { onChangeTextArea(e, note) }}
                                            key={i + 5}
                                            type="date"
                                            defaultValue={note.date}
                                            style={{ marginTop: "10%", borderRadius: "5px 5px 5px 5px", border: '1px solid #cbcbcb' }}
                                        >
                                        </input>


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
                                    </div>
                                    <textarea
                                        style={{ width: "94%", fontSize: "medium", borderRadius: "5px 5px 5px 5px" }}
                                        key={i + 4}
                                        id="editCard"
                                        autoFocus={true}
                                        onChange={
                                            (e) => onChangeTextArea(e, note)
                                        }
                                    >
                                        {note.text}
                                    </textarea>

                                    <div>
                                        <Button
                                            key={i + 6}
                                            onClick={() => saveNote(note)}
                                        >
                                            <strong>Save Me</strong>
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

export { NoteHistory }