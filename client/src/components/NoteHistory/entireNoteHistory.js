import React, { useState } from 'react';
import Grid from '@mui/material/Grid/index.js';
import Container from '@mui/material/Container/index.js';
import Notes from '../Notes/notes.js';
import './entireNoteHistory.css';


const NoteHistory = () => {
    const [noNotes, setnoNotes] = useState();


    const onStarValueChange = (e, note) => {
        const updatedNote = JSON.parse(sessionStorage.getItem(note._id));
        let newNote;
        if (updatedNote) {
            newNote = {
                text: updatedNote.text,
                date: updatedNote.date,
                star: e.target.value,
                _id: updatedNote._id,
                edit: updatedNote.edit,
            };
        } else {
            newNote = {
                text: note.text,
                date: note.date,
                star: e.target.value,
                _id: note._id,
                edit: note.edit,
            };
        }
        sessionStorage.setItem(note._id, JSON.stringify(newNote));
    };

    const setNoNotes = (text) => {
        setnoNotes(text);
    };

    return (
        <div>
            <Container maxWidth={false}>
                <div id="noNotes">{noNotes}</div>
                <Grid
                    className="grid"
                    container
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Notes
                        setNoNotes={setNoNotes}
                        onStarValueChange={onStarValueChange}
                    ></Notes>
                </Grid>
            </Container>
        </div>
    );
};

export { NoteHistory };
