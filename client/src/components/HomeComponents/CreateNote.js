import React, { useState } from 'react';
import Grid from '@mui/material/Grid/index.js';
import TextField from '@mui/material/TextField/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import Select from '@mui/material/Select/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import Button from '@mui/material/Button/index.js';
import NoteRoutes from '../../router/noteRoutes.js';
import './createNote.css';

export const CreateNote = (props) => {
  const [date, setDate] = useState();

  const emojiList = [
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
  ];

  const setCodeIcon = (iconType, trackedStats) => {
    if (iconType.visible === 'visible') {
      iconType.visible = 'hidden';
      props.setTrackedStats([...trackedStats]);
      return;
    }
    if (iconType.visible === 'hidden') {
      iconType.visible = 'visible';
      props.setTrackedStats([...trackedStats]);
      return;
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
    for (const stat of props.trackedStats) {
      if (stat.name === trackedStat.name) {
        return;
      }
    }
    props.setTrackedStats([...props.trackedStats, trackedStat]);
    NoteRoutes.postUserStats(user, trackedStat);
    return;
  };

  return (
    <>
      <div id="mobileCreateNote">
        <Grid item xs={12} s={12} m={6} l={6} style={{ margin: '0' }}>
          <TextField
            autoFocus={true}
            multiline
            rows={7}
            label="Note"
            id="fullWidth"
            color="primary"
            placeholder="Note"
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
            style={{ overflowY: 'auto', overflow: 'visible' }}
          ></TextField>
          <div style={{ width: '20rem', marginLeft: '12px' }}>
            {props.trackedStats?.map((i, key) => {
              return i ? (
                <span key={key + 300}>
                  <span
                    key={key}
                    value={i.icon}
                    onClick={() => {
                      setCodeIcon(i, props.trackedStats);
                    }}
                  >
                    {i.icon}
                  </span>
                  <span
                    key={key + 200}
                    role="img"
                    aria-label="checkmark"
                    style={{
                      visibility: i.visible ? `${i.visible}` : 'hidden',
                      marginRight: '.5rem',
                    }}
                  >
                    ✔️
                  </span>
                </span>
              ) : (
                <></>
              );
            })}
          </div>
        </Grid>
        <Grid item xs={6} s={6} m={6} l={6} style={{ marginTop: '0' }}>
          <span
            style={{
              display: 'flex',
              alignContent: 'space-around',
              flexWrap: 'wrap',
              flexDirection: 'column',
            }}
          >
            <input
              id="date"
              type="date"
              placeholder="Date"
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                marginTop: '2.5rem',
              }}
            ></input>

            <FormControl
              id="emoji"
              sx={{ m: 1 }}
              style={{ position: 'absolute', marginTop: '13%', width: '7rem' }}
            >
              <InputLabel id="demo-simple-select-label">Icons</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={''}
                // label="Age"
                onChange={(e) => {
                  addToEmojiList(e.target.value, emojiList, props.user);
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

            <Button
              id="saveMe"
              disabled={props.disabled}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                marginTop: '13%',
              }}
              variant="contained"
              value="save"
              color="primary"
              onClick={() => props.storeNewNote(props.trackedStats, date)}
            >
              Save Note
            </Button>
          </span>
        </Grid>
      </div>
      <span id="desktopCreateNote">
        <Grid item xs={6} s={6} m={6} l={6} style={{ margin: '0' }}>
          <TextField
            autoFocus={true}
            multiline
            rows={7}
            label="Note"
            id="fullWidth"
            color="primary"
            placeholder="Note"
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
            style={{ overflowY: 'auto', overflow: 'visible' }}
          ></TextField>
          <div style={{ width: '20rem', marginLeft: '12px' }}>
            {props.trackedStats?.map((i, key) => {
              return i ? (
                <span key={key + 300}>
                  <span
                    key={key}
                    value={i.icon}
                    onClick={() => {
                      setCodeIcon(i, props.trackedStats);
                    }}
                  >
                    {i.icon}
                  </span>
                  <span
                    key={key + 200}
                    role="img"
                    aria-label="checkmark"
                    style={{
                      visibility: i.visible ? `${i.visible}` : 'hidden',
                      marginRight: '.5rem',
                    }}
                  >
                    ✔️
                  </span>
                </span>
              ) : (
                <></>
              );
            })}
          </div>
        </Grid>
        <Grid item xs={6} s={6} m={6} l={6} style={{ marginTop: '0' }}>
          <span>
            <input
              id="date"
              type="date"
              placeholder="Date"
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ alignSelf: 'center', position: 'absolute' }}
            ></input>

            <Button
              disabled={props.disabled}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                marginTop: '140px',
                marginLeft: '7px',
              }}
              variant="contained"
              value="save"
              color="primary"
              onClick={() =>
                { 
                props.storeNewNote(props.trackedStats, date)

              }}
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
                  addToEmojiList(e.target.value, emojiList, props.user);
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
          </span>
        </Grid>
      </span>
    </>
  );
};
