/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable-next-line no-unused-vars */
/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';
import Grid from '@mui/material/Grid/index.js';
import Container from '@mui/material/Container/index.js';
import { useAuth0 } from '@auth0/auth0-react';
import NoteRoutes from '../../router/noteRoutes.js';
import Notes from '../Notes/notes.js';
import './entireNoteHistory.css';
import textchange from '../textchangeclass'

const NoteHistory = () => {
  const startingSearchDate = new Date();
  const { user } = useAuth0();
  const [noNotes, setnoNotes] = useState();
  const [notes, setNotes] = useState([]);
  const userId = user.sub.split('|')[1];
  const [startDate, setStartDate] = useState(
    startingSearchDate.toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState();
  const [noteEditId, setNoteEditId] = useState();
  const [trackingCharacterDeletions, setTrackingCharacterDeletions] = useState();
  const [noteId, setNoteId] = useState();

    let text = new textchange()

  console.log(text.changeText('gh'),"textcahnge");

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

  const getNoteRange = async (userId, start, end) => {
    if (start > end) {
      console.log('error');
    }
    if (!start) {
      console.log('Please Pick a Starting Date');
    }
    const resp = await NoteRoutes.getNoteRange(userId, end, start);
    const cast = JSON.parse(resp);
    const c = cast.sort((a, b) => {
      return a.date > b.date;
    });
    setNotes(c);
  };

  const setStartSearch = (e) => {
    setStartDate(e.target.value);
    if (endDate) {
      getNoteRange(userId, e.target.value, endDate);
    }
  };

  const runDateSearch = (e) => {
    const end = e.target.value;
    setEndDate(e.target.value);
    getNoteRange(userId, startDate, end);
  };

  const checkfordelete = (e, note) => {
    setNoteEditId(note._id);
    setTrackingCharacterDeletions(e.target.value);
    setNoteId(note._id);
    if (noteId !== note._id) {
      //setReadyOnly(false);
    }
    if (e.key === 'Backspace') {
      //setReadyOnly(false);
    }
  };


  return (
    <div>
      <Container maxWidth={false}>
        <Container>
          <input
            type="date"
            defaultValue={startDate}
            onChange={(e) => setStartSearch(e)}
            className="date"
          ></input>
          <input
            type="date"
            defaultValue={endDate}
            onChange={(e) => runDateSearch(e)}
            className="date"
          ></input>
        </Container>
        <div id="noNotes">{noNotes}</div>
        <Grid
          className="grid"
          container
          justifyContent="center"
          alignItems="flex-start"
        >
          <Notes
            setNoNotes={setNoNotes}
            checkfordelete={checkfordelete}
            onStarValueChange={onStarValueChange}
          ></Notes>
        </Grid>
      </Container>
    </div>
  );
};

export { NoteHistory };
