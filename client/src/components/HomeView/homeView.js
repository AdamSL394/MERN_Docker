/* eslint-disable max-len */
import { useAuth0 } from '@auth0/auth0-react';
import Container from '@mui/material/Container/index.js';
import Grid from '@mui/material/Grid/index.js';
import React, { useEffect, useState } from 'react';
import NoteRoutes from '../../router/noteRoutes.js';
import { CreateNote } from '../HomeComponents/CreateNote.js';
import { LookBack } from '../HomeComponents/LookBack/index.js';
import { HomeNotes } from '../HomeComponents/NotesHomeView.js';
import { AlertMessage } from '../HomeComponents/SaveNoteAlert/index.js';
import './homeView.css';

const HomeView = () => {
  const { user } = useAuth0();
  const [noNotes, setnoNotes] = useState();
  const [noteError, setNoteError] = useState();
  const [text, setText] = useState();

  const [disabled, setDisabled] = useState(false);

  const [notes, setNotes] = useState([]);
  const [noteview, setNoteView] = useState('week');
  const [timePeriod, setTimePeriod] = useState('1');
  const [trackedStats, setTrackedStats] = useState([]);

  const [successFlag, setSuccessFlag] = useState('hidden');
  const [errorFlag, setErrorFlag] = useState('hidden');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const userid = user.sub.split('|')[1];
    const todaysDate = new Date().toISOString().split('T')[0];
    const myCurrentDate = new Date();
    const myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 7);
    const lastWeeksDate = myPastDate.toISOString().split('T')[0];
    getNoteRanges(userid, todaysDate, lastWeeksDate);
    getUserInformation(user);
  }, []);

  const storeNewNote = async (stats, date) => {
    const userId = user.sub.split('|')[1];
    setDisabled(true);

    const raw = {
      text: text,
      date: date,
      userId: userId,
    };
    if (text === undefined || text.length < 1) {
      setErrorMessage('Please set a message & date');
      setErrorFlag('visible');
      setTimeout(() => {
        setErrorFlag('hidden');
        setDisabled(false);
      }, 2000);

      return;
    }
    if (date === undefined) {
      setErrorMessage('Please set a message & date');
      setErrorFlag('visible');
      setTimeout(() => {
        setErrorFlag('hidden');
        setDisabled(false);
      }, 2000);

      return;
    }

    for (const stat of stats) {
      if (stat.visible === 'visible') {
        raw[stat.name] = true;
      }
    }

    const res = await NoteRoutes.postNote(raw);
    const todaysDate = new Date().toISOString().split('T')[0];
    const myCurrentDate = new Date();
    const myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 7);
    const lastWeeksDate = myPastDate.toISOString().split('T')[0];

    if (res && res.toString().includes('failed')) {
      setErrorMessage(res);
      setErrorFlag('visible');
      setTimeout(() => {
        setErrorFlag('hidden');
      }, 1500);
      setTimeout(() => {
        setDisabled(false);
      }, 1500);
    } 
    if (date >= lastWeeksDate && date <= todaysDate  ){
      const userid = user.sub.split('|')[1];
      setText('');
      setSuccessMessage(res);
      setSuccessFlag('visible');
      //onNumericChange(checked, timePeriod);
      for (const stat of trackedStats) {
        if (stat.visible === 'visible') {
          stat.visible = 'hidden';
        }
      }
      setTimeout(() => {
        setSuccessFlag('hidden');
      }, 1500);
      setTimeout(() => {
        setDisabled(false);
      }, 1500);
      getNoteRanges(userid, todaysDate, lastWeeksDate);
      return
    }
    else{
      setText('');
      setSuccessMessage(res);
      setSuccessFlag('visible');
      //onNumericChange(checked, timePeriod);
      for (const stat of trackedStats) {
        if (stat.visible === 'visible') {
          stat.visible = 'hidden';
        }
      }
      setTimeout(() => {
        setSuccessFlag('hidden');
      }, 1500);
      setTimeout(() => {
        setDisabled(false);
      }, 1500);
    }
    return;
  };

  const getNoteRanges = async (userid, todaysDate, lastWeeksDate) => {
    try {
      const res = await NoteRoutes.getNoteRange(
        userid,
        lastWeeksDate,
        todaysDate
      );

      if (!checkNoteApiResponse(res)) {
        return;
      }

      setNoteError('');
      setnoNotes('');
      setNotes(res);
    } catch (error) {
      setNoteError('Error Getting Notes');
    }
  };

  const getUserInformation = async (user) => {
    const res = await NoteRoutes.getUserInfomation(user);
    if (res) {
      const userInfo = JSON.parse(res);
      setTrackedStats(userInfo.searchedUser.settings);
    }
  };

  const checkNoteApiResponse = (notes) => {
    if (notes.length < 1) {
      setNotes([]);
      setnoNotes('No Notes for last week.');
      return false;
    } else {
      return true;
    }
  };

  return (
    <Container id="container">
      <div className="formButtons">
        <CreateNote
          disabled={disabled}
          setTrackedStats={setTrackedStats}
          trackedStats={trackedStats}
          user={user}
          setText={setText}
          text={text}
          storeNewNote={storeNewNote}
        ></CreateNote>
        {/* <div>Leetcode Problems Solved: {leetcode}</div> */}
      </div>

      <AlertMessage
        successFlag={successFlag}
        errorFlag={errorFlag}
        successMessage={successMessage}
        errorMessage={errorMessage}
      ></AlertMessage>

      <LookBack
        timePeriod={timePeriod}
        setNotes={setNotes}
        setnoNotes={setnoNotes}
        setNoteError={setNoteError}
        setTimePeriod={setTimePeriod}
        setNoteView={setNoteView}
        getNoteRanges={getNoteRanges}
        noteview={noteview}
      ></LookBack>

      <h3 id="pastNoteHeader">{noNotes}</h3>
      <h3 id="pastNoteError">{noteError}</h3>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <HomeNotes notes={notes}></HomeNotes>
      </Grid>
    </Container>
  );
};

export { HomeView };
