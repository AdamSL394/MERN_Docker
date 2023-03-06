/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

export const EditingTrackedEmojis = (props) => {
    const noteLook = (note) => {
        if (note.look === false) {
            note.look = true;
            props.setNoteValue();
        } else {
            note.look = false;
            props.setNoteValue();
        }
        return;
    };

    const noteCode = (note) => {
        if (note.code === false) {
            note.code = true;
            props.setNoteValue();
        } else {
            note.code = false;
            props.setNoteValue();
        }
    };

    const noteRead = (note) => {
        if (note.read === false) {
            note.read = true;
            props.setNoteValue();
        } else {
            note.read = false;
            props.setNoteValue();
        }
    };

    const noteEatOut = (note) => {
        if (note.eatOut === false) {
            note.eatOut = true;
            props.setNoteValue();
        } else {
            note.eatOut = false;
            props.setNoteValue();
        }
    };

    const noteBasketball = (note) => {
        if (note.basketball === false) {
            note.basketball = true;
            props.setNoteValue();
        } else {
            note.basketball = false;
            props.setNoteValue();
        }
    };

    const noteGym = (note) => {
        if (note.gym === false) {
            note.gym = true;
            props.setNoteValue();
        } else {
            note.gym = false;
            props.setNoteValue();
        }
    };

    const noteWeed = (note) => {
        if (note.weed === false) {
            note.weed = true;
            props.setNoteValue();
        } else {
            note.weed = false;
            props.setNoteValue();
        }
    };
    return (
        <>
            <div style={{ borderTop: '1px solid #cbcbcb' }}>
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
                    onClick={() => noteLook(props.note)}
                >
                    {' '}
            👀{' '}
                </span>

                <span
                    role="img"
                    aria-label="arm"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => noteGym(props.note)}
                >
            💪🏼{' '}
                </span>

                <span
                    role="img"
                    aria-label="leaf"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => noteWeed(props.note)}
                >
            🍁{' '}
                </span>

                <span
                    role="img"
                    aria-label="computer guy"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => noteCode(props.note)}
                >
            👨🏻‍💻{' '}
                </span>

                <span
                    role="img"
                    aria-label="books"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => noteRead(props.note)}
                >
            📚{' '}
                </span>

                <span
                    role="img"
                    aria-label="pizza"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => noteEatOut(props.note)}
                >
            🍕{' '}
                </span>

                <span
                    role="img"
                    aria-label="basketball"
                    style={{ marginRight: '.4rem', cursor: 'pointer' }}
                    onClick={() => noteBasketball(props.note)}
                >
            ⛹🏻‍♂️{' '}
                </span>
            </div>
        </>
    );
};
