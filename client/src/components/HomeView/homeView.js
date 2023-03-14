/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import Select from '@mui/material/Select/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import Button from '@mui/material/Button/index.js';
import './homeView.css';
import Container from '@mui/material/Container/index.js';
import Card from '@mui/material/Card/index.js';
import Grid from '@mui/material/Grid/index.js';
import Alert from '@mui/material/Alert/index.js';
import NoteRoutes from '../../router/noteRoutes.js';
import { useAuth0 } from '@auth0/auth0-react';
import Switch from '@mui/material/Switch/index.js';
import { HomeNotes } from '../HomeComponents/NotesHomeView.js';

const HomeView = () => {
  const { user } = useAuth0();
  const [noNotes, setnoNotes] = useState();
  const [noteError, setNoteError] = useState();
  const [text, setText] = useState();
  const [date, setDate] = useState();
  // const [leetcode, setLeetcode] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [star, setStar] = useState(false);
  const [successFlag, setSuccessFlag] = useState('hidden');
  const [errorFlag, setErrorFlag] = useState('hidden');
  const userId = user.sub.split('|')[1];
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notes, setNotes] = useState([]);
  const [checked, setChecked] = useState(true);
  const [noteview, setNoteView] = useState('week');
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState([]);
  const [timePeriod, setTimePeriod] = useState('1');
  // eslint-disable-next-line no-unused-vars
  const [emojiList, setEmojiList] = useState([
    { icon: '🥇', name: 'medal', visible: 'hidden' },
    { icon: '👀', name: 'look', visible: 'hidden' },
    { icon: '💪🏼', name: 'gym', visible: 'hidden' },
    { icon: '🍁', name: 'weed', visible: 'hidden' },
    { icon: '👨🏻‍💻', name: 'code', visible: 'hidden' },
    { icon: '⛹🏻‍♂️', name: 'basketball', visible: 'hidden' },
    { icon: '📚', name: 'read', visible: 'hidden' },
    { icon: '🍕', name: 'eatOut', visible: 'hidden' },
    { icon: '🤴🏻', name: 'king', visible: 'hidden' },
    { icon: '👫', name: 'date/smoosh', visible: 'hidden' },
    { icon: '🌟', name: 'star', visible: 'hidden' },
  ]);
  const [trackedStats, setTrackedStats] = useState([
    { icon: '🥇', name: 'medal', visible: 'hidden' },
  ]);
  const uniqueIds = [];

  const withoutDups = trackedStats.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.name);
    if (!isDuplicate) {
      uniqueIds.push(element.name);
      return true;
    }
    return false;
  });

  const storeNewNote = async (userId, withoutDups) => {
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

    for (const stat of withoutDups) {
      if (stat.visible === 'visible') {
        raw[stat.name] = true;
      }
    }

    const res = await NoteRoutes.postNote(raw);

    if (res && res.toString().includes('failed')) {
      setErrorMessage(res);
      setErrorFlag('visible');
      setTimeout(() => {
        setErrorFlag('hidden');
      }, 1500);
      setTimeout(() => {
        setDisabled(false);
      }, 1500);
    } else {
      setText('');
      setStar('None');
      setSuccessMessage(res);
      setSuccessFlag('visible');
      onNumericChange(checked, timePeriod);
      for (const stat of withoutDups) {
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

  useEffect(() => {
    const userid = user.sub.split('|')[1];
    const todaysDate = new Date().toISOString().split('T')[0];
    const myCurrentDate = new Date();
    const myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 7);
    const lastWeeksDate = myPastDate.toISOString().split('T')[0];
    getNoteRanges(userid, todaysDate, lastWeeksDate);
    getUserInformation(user);
    // let a = await NoteRoutes.Leetcode_stats()
    // console.log(a)
    // setLeetcode(a.totalSolved)
  }, []);

  const handleChange = (event) => {
    const numericValue = event.target.checked;
    setChecked(event.target.checked);

    if (!numericValue) {
      onNumericChange(numericValue, timePeriod);
      if (timePeriod > 1) {
        setNoteView('years');
        return;
      }
      setNoteView('year');
    }
    if (numericValue) {
      onNumericChange(numericValue, timePeriod);
      if (timePeriod > 1) {
        setNoteView('weeks');
        return;
      }
      setNoteView('week');
    }
  };

  const getNoteRanges = async (userid, todaysDate, lastWeeksDate) => {
    
    try {
      const res = await NoteRoutes.getNoteRange(
        userid,
        lastWeeksDate,
        todaysDate,
      );

      if (res.length === 0) {
        console.log('ere')
        setNotes([]);
        setnoNotes('No Notes for last week.');
        return;
      }
      setNoteError('');
      setnoNotes('');
      setNotes(res);
    } catch (error) {
      setNoteError('Error Getting Notes');
    }
  };

  const getNoteRangeYear = async () => {
    console.log('here')
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
      console.log('here',res)
      if (res) {;
        if (res.length < 1) {
          setNotes(res);
          setnoNotes('No Notes for last year.');
          return;
        }
        setNoteError('');
        setnoNotes('');
        setNotes(res);
      }
    } catch (error) {
      setNoteError('Error Getting Notes');
    }
  };

  const setCodeIcon = (iconType, trackedStats) => {
    if (iconType.visible === 'visible') {
      iconType.visible = 'hidden';
      setTrackedStats([...trackedStats]);
      return;
    }
    if (iconType.visible === 'hidden') {
      iconType.visible = 'visible';
      setTrackedStats([...trackedStats]);
      return;
    }
  };

  const getUserInformation = async (user) => {
    const res = await NoteRoutes.getUserInfomation(user);
    if (res) {
      const userInfo = JSON.parse(res);
      setTrackedStats(userInfo.searchedUser.settings);
    }
  };

  const addToEmojiList = (value, emojiList, user) => {
    let emojiName = '';
    let visible = 'hidden';
    for (const item of emojiList) {
      if (item.icon === value) {
        emojiName = item.name;
        visible = item.visible;
      }
    }

    const trackedStat = {
      icon: `${value}`,
      name: `${emojiName}`,
      visible: `${visible}`,
    };
    for (const stat of trackedStats) {
      if (stat.name === trackedStat.name) {
        return;
      }
    }
    setTrackedStats([...trackedStats, trackedStat]);
    NoteRoutes.postUserStats(user, trackedStat);
  };

  const onNumericChange = async (checked, value) => {
    setTimePeriod(value);
    if (checked) {
      if (value === '1') {
        setNoteView('week');
        const userid = user.sub.split('|')[1];
        const todaysDate = new Date().toISOString().split('T')[0];
        const myCurrentDate = new Date();
        const myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 7);
        const lastWeeksDate = myPastDate.toISOString().split('T')[0];
        getNoteRanges(userid, todaysDate, lastWeeksDate);
      }
      if (value === '2') {
        setNoteView('weeks');
        const userid = user.sub.split('|')[1];
        // let todaysDate = new Date().toISOString().split("T")[0]
        const myCurrentDate = new Date();
        const myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 8);
        const eightDaysago = myPastDate.toISOString().split('T')[0];
        const pastDate = new Date(myCurrentDate);
        pastDate.setDate(pastDate.getDate() - 14);
        const fourteenDaysAgo = pastDate.toISOString().split('T')[0];
        getNoteRanges(userid, eightDaysago, fourteenDaysAgo);
      }
      if (value === '3') {
        setNoteView('weeks');
        const userid = user.sub.split('|')[1];
        // let todaysDate = new Date().toISOString().split("T")[0]
        const myCurrentDate = new Date();
        const myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - 15);
        const eightDaysago = myPastDate.toISOString().split('T')[0];
        const pastDate = new Date(myCurrentDate);
        pastDate.setDate(pastDate.getDate() - 22);
        const fourteenDaysAgo = pastDate.toISOString().split('T')[0];
        getNoteRanges(userid, eightDaysago, fourteenDaysAgo);
      }
    }
    // year
    if (!checked) {
        console.log('here',value)
      if (value === '1') {
        console.log('here')
        setNoteView('year');
        getNoteRangeYear();
      }
      if (value === '2') {
        setNoteView('years');
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
            setNotes(res);
            setnoNotes('No Notes for last year.');
            return;
          }
          setNoteError('');
          setnoNotes('');
          setNotes(res);
        }
      }
      if (value === '3') {
        setNoteView('years');
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
          todayLastYear,
        );
        if (res) {
          if (res.length < 1) {
            setNotes(res);
            setnoNotes('No Notes for last year.');
            return;
          }
          setNoteError('');
          setnoNotes('');
          setNotes(res);
        }
      }
    }
  };

  return (
    <Container id="container">
      <div className="formButtons">
        <Grid item xs={6} s={6} m={6} l={6} style={{ margin: '0' }}>
          <TextField
            autoFocus={true}
            multiline
            rows={7}
            label="Note"
            id="fullWidth"
            color="primary"
            placeholder="Note"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ overflowY: 'auto', overflow: 'visible' }}
          ></TextField>
          <div style={{ width: '20rem', marginLeft: '12px' }}>
            {withoutDups.map((i, key) => {
              return (
                <span key={key + 300}>
                  <span
                    key={key}
                    value={i.icon}
                    onClick={() => {
                      setCodeIcon(i, withoutDups);
                    }}
                  >
                    {i.icon}
                  </span>
                  <span
                    key={key + 200}
                    role="img"
                    aria-label="checkmark"
                    style={{ visibility: `${i.visible}`, marginRight: '.5rem' }}
                  >
                    ✔️
                  </span>
                </span>
              );
            })}
          </div>
        </Grid>
        <Grid item xs={6} s={6} m={6} l={6} style={{ marginTop: '0' }}>
          <input
            id="date"
            type="date"
            placeholder="Date"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ alignSelf: 'center', position: 'absolute' }}
          ></input>

          <Button
            disabled={disabled}
            style={{
              alignSelf: 'center',
              position: 'absolute',
              marginTop: '140px',
              marginLeft: '7px',
            }}
            variant="contained"
            value="save"
            color="primary"
            onClick={() => storeNewNote(userId, withoutDups)}
          >
            Save Note
          </Button>
          <FormControl
            sx={{ m: 1 }}
            style={{ position: 'absolute', marginTop: '59px', width: '7rem' }}
          >
            <InputLabel id="demo-simple-select-label">Icons</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={''}
              // label="Age"
              onChange={(e) => {
                addToEmojiList(e.target.value, emojiList, user);
              }}
            >
              {emojiList.map((i, key) => {
                return (
                  <MenuItem key={key + 100} value={i.icon}>
                    <span key={key}>{i.icon}</span>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        {/* <div>Leetcode Problems Solved: {leetcode}</div> */}
      </div>
      <Alert
        severity="success"
        style={{ visibility: successFlag, marginTop: '1%' }}
        id="successFlag"
        open={false}
      >
        {successMessage}
      </Alert>
      <Alert severity="error" style={{ visibility: errorFlag }} open={false}>
        {errorMessage}
      </Alert>
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
        <span>{noteview} ago</span>
      </h2>
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
