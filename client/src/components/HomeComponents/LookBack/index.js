import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import NoteRoutes from '../../../router/noteRoutes.js';
import Switch from '@mui/material/Switch/index.js';

export const LookBack = (props) => {
  const [checked, setChecked] = useState(true);
  const { user } = useAuth0();

  const getNoteRangeYear = async () => {
    const userid = user.sub.split('|')[1];
    const date = new Date();
    const futureDay = date.getDate() + 7;
    let day = date.getDate();
    const year = date.getFullYear() - 1;

    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    const weekAheadLastYear = year + '-' + month + '-' + futureDay;
    const todayLastYear = year + '-' + month + '-' + day;
    try {
      const res = await NoteRoutes.getNoteRangeYear(
        userid,
        weekAheadLastYear,
        todayLastYear
      );

      if (res) {
        if (res.length < 1) {
          props.setNotes(res);
          props.setnoNotes('No Notes for last year.');
          return;
        }
        props.setNoteError('');
        props.setnoNotes('');
        props.setNotes(res);
      }
    } catch (error) {
        props.setNoteError('Error Getting Notes');
    }
  };


  const onNumericChange = async (checked, value) => {
    props.setTimePeriod(value);
    if (checked) {
      if (value === '1') {
        props.setNoteView('week');
        const userid = user.sub.split('|')[1];
        const todaysDate = new Date().toISOString().split('T')[0];
        const myCurrentDate = new Date();
        const myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 7);
        const lastWeeksDate = myPastDate.toISOString().split('T')[0];
        props.getNoteRanges(userid, todaysDate, lastWeeksDate);
      }
      if (value === '2') {
        props.setNoteView('weeks');
        const userid = user.sub.split('|')[1];
        const myCurrentDate = new Date();
        const myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 7);
        const eightDaysago = myPastDate.toISOString().split('T')[0];
        const pastDate = new Date(myCurrentDate);
        pastDate.setDate(pastDate.getDate() - 14);
        const fourteenDaysAgo = pastDate.toISOString().split('T')[0];
        props.getNoteRanges(userid, eightDaysago, fourteenDaysAgo);
      }
      if (value === '3') {
        props.setNoteView('weeks');
        const userid = user.sub.split('|')[1];
        const myCurrentDate = new Date();
        const myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 14);
        const eightDaysago = myPastDate.toISOString().split('T')[0];
        const pastDate = new Date(myCurrentDate);
        pastDate.setDate(pastDate.getDate() - 22);
        const fourteenDaysAgo = pastDate.toISOString().split('T')[0];
        props.getNoteRanges(userid, eightDaysago, fourteenDaysAgo);
      }
    }
    // year
    if (!checked) {
      if (value === '1') {
        props.setNoteView('year');
        getNoteRangeYear();
      }
      if (value === '2') {
        props.setNoteView('years');
        const userid = user.sub.split('|')[1];
        const date = new Date();
        const futureDay = date.getDate() + 7;

        let day = date.getDate();
        const year = date.getFullYear() - 2;
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        const weekAheadLastYear = year + '-' + month + '-' + futureDay;
        const todayLastYear = year + '-' + month + '-' + day;
        const res = await NoteRoutes.getNoteRangeYear(
          userid,
          weekAheadLastYear,
          todayLastYear
        );
        if (res) {
          if (res.length < 1) {
            props.setNotes(res);
            props.setnoNotes('No Notes for last year.');
            return;
          }
          props.setNoteError('');
          props.setnoNotes('');
          props.setNotes(res);
        }
      }
      if (value === '3') {
        props.setNoteView('years');
        const userid = user.sub.split('|')[1];
        const date = new Date();
        const futureDay = date.getDate() + 7;
        let day = date.getDate();
        const year = date.getFullYear() - 3;
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        const weekAheadLastYear = year + '-' + month + '-' + futureDay;
        const todayLastYear = year + '-' + month + '-' + day;
        const res = await NoteRoutes.getNoteRangeYear(
          userid,
          weekAheadLastYear,
          todayLastYear
        );
        if (res) {
          if (res.length < 1) {
            props.setNotes(res);
            props.setnoNotes('No Notes for last year.');
            return;
          }
          props.setNoteError('');
          props.setnoNotes('');
          props.setNotes(res);
        }
      }
    }
  };

  const handleChange = (event) => {
    const numericValue = event.target.checked;
    setChecked(event.target.checked);

    if (!numericValue) {
      onNumericChange(numericValue, props.timePeriod);
      if (props.timePeriod > 1) {
        props.setNoteView('years');
        return;
      }
      props.setNoteView('year');
    }
    if (numericValue) {
      onNumericChange(numericValue, props.timePeriod);
      if (props.timePeriod > 1) {
        props.setNoteView('weeks');
        return;
      }
      props.setNoteView('week');
    }
  };

  return (
    <>
      <span style={{ float: 'right !important' }}>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          id="switch"
          label="Label"
        />
      </span>

      <h2 id="pastNoteHeader">
        <span>
          <form
            action="#"
            onChange={(e) => onNumericChange(checked, e.target.value)}
            style={{ marginRight: '12rem' }}
          >
            <select
              name="languages"
              id="lang"
              style={{ position: 'absolute', marginTop: '.4rem' }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </form>
        </span>
        <span>{props.noteview} ago</span>
      </h2>
    </>
  );
};
