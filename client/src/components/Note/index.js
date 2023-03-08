/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@mui/material/Grid/index.js';
import Card from '@mui/material/Card/index.js';
import Button from '@mui/material/Button/index.js';
import NoteText from '../NoteText/noteText.js';
import PropTypes from 'prop-types';

function Note(props) {
    const editNote = (note) => {
        note.textLength = 200 - note.text.length;
        note.edit = true;
        sessionStorage.setItem(note._id, JSON.stringify(note));
        props.updateNote(note);
    };
    return (
        <Grid xs={8} sm={5} md={5} lg={2} style={{ margin: '.5%' }} item={true}>
            <Card
                item={4}
                style={{ marginBottom: '2%' }}
                id="Card"
                value={props.note.id}
                variant="outlined"
            >
                <Button
                    id="deleteButton"
                    value={props.note.id}
                    onClick={() => props.openModal(props.note)}
                >
                    <strong>X</strong>
                </Button>
                <span
                    style={{ float: 'left', cursor: 'pointer' }}
                    onClick={() => editNote(props.note)}
                >
          🖊
                </span>
                <div
                    style={{
                        marginBottom: '5%',
                        borderBottom: '1px solid #e8e8e8',
                    }}
                >
                    <span style={{ marginRight: '5%' }}>
                        {' '}
                        <strong>{props.note.date}</strong>
                    </span>
                    <strong>
                        <span role="img" aria-label="star">
              ✨
                        </span>{' '}
            &apos;s:&nbsp; {props.note.star}
                    </strong>
                </div>

                <NoteText note={props.note}></NoteText>

                <div style={{ borderTop: '1px solid #cbcbcb' }}>
                    <span>
                        {props.note.look ? (
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
                        {props.note.gym ? (
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
                        {props.note.weed ? (
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
                        {props.note.code ? (
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
                        {props.note.read ? (
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
                        {props.note.eatOut ? (
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
                        {props.note.basketball ? (
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
}

export default Note;

Note.propTypes = {
    openModal: PropTypes.func,
    editNote: PropTypes.func,
    note: PropTypes.object,
};
