/* eslint-disable indent */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card/index.js';
import Button from '@mui/material/Button/index.js';
import Grid from '@mui/material/Grid/index.js';
import FormControl from '@mui/material/FormControl/index.js';
import Select from '@mui/material/Select/index.js';
import InputLabel from '@mui/material/InputLabel/index.js';
import MenuItem from '@mui/material/MenuItem/index.js';
import NoteText from './noteText';
import { Container } from '@mui/system';

function Notes(props) {
  const [readOnly, setReadyOnly] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);

  const editNote = (note) => {
    note.textLength = 200 - note.text.length;
    note.edit = true;
    sessionStorage.setItem(note._id, JSON.stringify(note));
    props.updateNote(note);
  };

  const saveNote = (note, value) => {
    const updatedNote = JSON.parse(sessionStorage.getItem(note._id));
    if (updatedNote != null) {
      console.log('1');
      updatedNote.edit = false;
      note.edit = false;
      sessionStorage.setItem(updatedNote._id, JSON.stringify(updatedNote));
      props.updateNote(updatedNote);
    } else {
      console.log('2');
      note.edit = false;
      sessionStorage.setItem(note._id, JSON.stringify(note));
      props.updateNote(note);
    }
  };

  return (
    <>
      {props.notes.map((note, i) => {
        if (!note.edit) {
          return (
            <Grid xs={8} sm={5} md={5} lg={2} style={{ margin: '.5%' }} key={i} item={true}>
                <Card
                  item={4}
                  style={{ marginBottom: '2%' }}
                  key={i + 110}
                  id="Card"
                  value={note.id}
                  variant="outlined"
                >
                    <Button
                      key={i + 102}
                      id="deleteButton"
                      value={note.id}
                      onClick={() => props.handleOpen(note)}
                    >
                      <strong>X</strong>
                    </Button>
                  <span
                    style={{ float: 'left', cursor: 'pointer' }}
                    onClick={() => editNote(note)}
                  >
                    🖊
                  </span>
                  <div
                    key={i + 104}
                    style={{
                      marginBottom: '5%',
                      borderBottom: '1px solid #e8e8e8',
                    }}
                  >
                    <span style={{ marginRight: '5%' }}>
                      {' '}
                      <strong>{note.date}</strong>
                    </span>
                    <strong>
                      <span role="img" aria-label="star">
                        ✨
                      </span>{' '}
                      &apos;s:&nbsp; {note.star}
                    </strong>
                  </div>

                  <NoteText note={note}></NoteText>

                  <div key={i + 105} style={{ borderTop: '1px solid #cbcbcb' }}>
                    <span>
                      {note.look ? (
                        <span
                          role="img"
                          aria-label="eyes"
                          style={{
                            backgroundColor: 'lightgrey',
                            marginRight: '.4rem',
                            border: '2px lightgrey',
                            borderRadius: '10px 10px 10px 10px',
                            paddingLeft: '4px',
                          }}
                        >
                          {' '}
                          👀{' '}
                        </span>
                      ) : null}
                    </span>
                    <span>
                      {note.gym ? (
                        <span
                          role="img"
                          aria-label="arm"
                          style={{
                            backgroundColor: '#ffffff',
                            marginRight: '.4rem',
                            cursor: 'pointer',
                          }}
                        >
                          💪🏼{' '}
                        </span>
                      ) : null}{' '}
                    </span>

                    <span>
                      {note.weed ? (
                        <span
                          role="img"
                          aria-labelledby="leaf"
                          style={{
                            backgroundColor: '#ffffff',
                            marginRight: '.4rem',
                            cursor: 'pointer',
                          }}
                        >
                          🍁{' '}
                        </span>
                      ) : null}{' '}
                    </span>

                    <span>
                      {note.code ? (
                        <span
                          role="computer guy"
                          aria-label="arm"
                          style={{
                            backgroundColor: '#ffffff',
                            marginRight: '.4rem',
                            cursor: 'pointer',
                          }}
                        >
                          👨🏻‍💻{' '}
                        </span>
                      ) : null}{' '}
                    </span>

                    <span>
                      {note.read ? (
                        <span
                          role="img"
                          aria-label="books"
                          style={{
                            backgroundColor: '#ffffff',
                            marginRight: '.4rem',
                            cursor: 'pointer',
                          }}
                        >
                          📚{' '}
                        </span>
                      ) : null}{' '}
                    </span>

                    <span>
                      {note.eatOut ? (
                        <span
                          role="img"
                          aria-label="pissa"
                          style={{
                            backgroundColor: '#ffffff',
                            marginRight: '.4rem',
                            cursor: 'pointer',
                          }}
                        >
                          🍕{' '}
                        </span>
                      ) : null}{' '}
                    </span>

                    <span>
                      {note.basketball ? (
                        <span
                          role="img"
                          aria-label="basketball"
                          style={{
                            backgroundColor: '#ffffff',
                            marginRight: '.4rem',
                            cursor: 'pointer',
                          }}
                        >
                          ⛹🏻‍♂️{' '}
                        </span>
                      ) : null}{' '}
                    </span>
                  </div>
                </Card>
            </Grid>
          );
        } else {
          if (note.textLength === undefined) {
            note.textLength = 200 - note.text.length;
          }
          return (
            <Grid xs={8} sm={5} md={5} lg={2} style={{ margin: '.5%' }} key={i}
            item
            >
              <Card key={i + 2} value={note.id} variant="outlined" id="Card">
                <Button
                  key={i + 3}
                  onClick={() => props.handleOpen(note)}
                  color="primary"
                  id="deleteButton"
                >
                  <strong>X</strong>
                </Button>

                <div
                  style={{
                    marginLeft: '5%',
                  }}
                  id="dateInput"
                >
                  <input
                    onChange={(e) => {
                      props.onChangeTextArea(e, note);
                    }}
                    key={i + 5}
                    type="date"
                    defaultValue={note.date}
                    style={{
                      marginTop: '4%',
                      borderRadius: '5px 5px 5px 5px',
                      border: '1px solid #cbcbcb',
                    }}
                  ></input>

                  <FormControl
                    sx={{ m: 1, minWidth: 90 }}
                    size="medium"
                    style={{ alignSelf: 'center' }}
                  >
                    <InputLabel
                      id="demo-select-small"
                      style={{ alignSelf: 'center' }}
                    ></InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      onChange={(e) => props.onStarValueChange(e, note)}
                      defaultValue={note.star}
                      style={{ height: ' 1.3rem' }}
                    >
                      <MenuItem value={'None'}>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'1'}>
                        <span role="img" aria-label="Star">
                          🌟
                        </span>
                      </MenuItem>
                      <MenuItem value={'2'}>
                        <span role="img" aria-label="Star">
                          🌟🌟
                        </span>
                      </MenuItem>
                      <MenuItem value={'3'}>
                        <span role="img" aria-label="Star">
                          🌟🌟🌟{' '}
                        </span>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div key={i + 105} style={{ borderTop: '1px solid #cbcbcb' }}>
                  <span
                    role="img"
                    aria-label="eyes"
                    style={{
                      marginRight: '.4rem',
                      border: '2px lightgrey',
                      borderRadius: '10px 10px 10px 10px',
                      cursor: 'pointer',
                      paddingLeft: '4px',
                    }}
                    onClick={() => props.noteLook(note)}
                  >
                    {' '}
                    👀{' '}
                  </span>

                  <span
                    role="img"
                    aria-label="arm"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => props.noteGym(note)}
                  >
                    💪🏼{' '}
                  </span>

                  <span
                    role="img"
                    aria-label="leaf"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => props.noteWeed(note)}
                  >
                    🍁{' '}
                  </span>

                  <span
                    role="img"
                    aria-label="computer guy"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => props.noteCode(note)}
                  >
                    👨🏻‍💻{' '}
                  </span>

                  <span
                    role="img"
                    aria-label="books"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => props.noteRead(note)}
                  >
                    📚{' '}
                  </span>

                  <span
                    role="img"
                    aria-label="pizza"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => props.noteEatOut(note)}
                  >
                    🍕{' '}
                  </span>

                  <span
                    role="img"
                    aria-label="basketball"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => props.noteBasketball(note)}
                  >
                    ⛹🏻‍♂️{' '}
                  </span>
                </div>
                {/* <Emojis note={note}
                ></Emojis> */}
                <textarea
                  style={{
                    width: '94%',
                    fontSize: 'medium',
                    borderRadius: '5px 5px 5px 5px',
                    height: '13rem',
                  }}
                  key={i + 4}
                  id="editCard"
                  autoFocus={true}
                  readOnly={readOnly}
                  onChange={(e) => props.onChangeTextArea(e, note)}
                  onKeyDown={(e) => props.checkfordelete(e, note)}
                  onPaste={(e) => props.onChangeTextArea(e, note)}
                >
                  {note.text}
                </textarea>

                <div>
                  <Button
                    key={i + 6}
                    onClick={() => saveNote(note, currentPage)}
                  >
                    <strong>Save Me</strong>
                  </Button>
                </div>
                <>{note.textLength}</>
                <div>
                  <span>
                    {note.look ? (
                      <span
                        role="img"
                        aria-label="eyes"
                        style={{
                          backgroundColor: 'lightgrey',
                          marginRight: '.4rem',
                          border: '2px lightgrey',
                          borderRadius: '10px 10px 10px 10px',
                          paddingLeft: '4px',
                        }}
                      >
                        {' '}
                        👀{' '}
                      </span>
                    ) : null}
                  </span>

                  <span>
                    {note.gym ? (
                      <span
                        role="img"
                        aria-label="arm"
                        className='emoji'
                      >
                        💪🏼{' '}
                      </span>
                    ) : null}{' '}
                  </span>

                  <span>
                    {note.weed ? (
                      <span
                        role="img"
                        aria-label="leaf"
                        className='emoji'
                      >
                        🍁{' '}
                      </span>
                    ) : null}{' '}
                  </span>

                  <span>
                    {note.code ? (
                      <span
                        role="img"
                        aria-label="computer guy"
                        className='emoji'
                      >
                        👨🏻‍💻{' '}
                      </span>
                    ) : null}{' '}
                  </span>

                  <span>
                    {note.read ? (
                      <span
                        role="img"
                        aria-label="books"
                        className='emoji'
                      >
                        📚{' '}
                      </span>
                    ) : null}{' '}
                  </span>

                  <span>
                    {note.eatOut ? (
                      <span
                        role="img"
                        aria-label="pizza"
                        className='emoji'
                      >
                        🍕{' '}
                      </span>
                    ) : null}{' '}
                  </span>

                  <span>
                    {note.basketball ? (
                      <span
                        role="img"
                        aria-label="basketball"
                        className='emoji'
                      >
                        ⛹🏻‍♂️{' '}
                      </span>
                    ) : null}{' '}
                  </span>
                </div>
              </Card>
            </Grid>
          );
        }
      })}
    </>
  );
}

export default Notes;
