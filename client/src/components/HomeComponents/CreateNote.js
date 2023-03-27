import React, { useState } from 'react';
import Grid from '@mui/material/Grid/index.js';
import TextField from '@mui/material/TextField/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import Select from '@mui/material/Select/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import Button from '@mui/material/Button/index.js';
import './createNote.css';

export const CreateNote = (props) => {
  const [text, setText] = useState();
  const [date, setDate] = useState();
  const [disabled, setDisabled] = useState(false);
  

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
            {props.withoutDups.map((i, key) => {
              return (
                <span key={key + 300}>
                  <span
                    key={key}
                    value={i.icon}
                    onClick={() => {
                      props.setCodeIcon(i, props.withoutDups);
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
              onChange={(e) => props.setDate(e.target.value)}
              style={{ alignSelf: 'center', position: 'absolute',marginTop: '2.5rem' }}
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
                  props.addToEmojiList(e.target.value, props.emojiList, props.user);
                }}
              >
                {props.emojiList.map((i, key) => {
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
              disabled={disabled}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                marginTop: '13%',
              }}
              variant="contained"
              value="save"
              color="primary"
              onClick={() => props.storeNewNote(props.withoutDups)}
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
            {props.withoutDups.map((i, key) => {
              return (
                <span key={key + 300}>
                  <span
                    key={key}
                    value={i.icon}
                    onClick={() => {
                      props.setCodeIcon(i, props.withoutDups);
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
          <span>
            <input
              id="date"
              type="date"
              placeholder="Date"
              defaultValue={date}
              onChange={(e) => props.setDate(e.target.value)}
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
              onClick={() => props.storeNewNote(props.withoutDups)}
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
                  props.addToEmojiList(e.target.value, props.emojiList, props.user);
                }}
              >
                {props.emojiList.map((i, key) => {
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
