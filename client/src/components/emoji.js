/* eslint-disable react/prop-types */
import React from 'react';

function Emojis(props) {
    return (
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
                onClick={() => props.noteLook(props.note)}
            >
                {' '}
        👀{' '}
            </span>

            <span
                role="img"
                aria-label="arm"
                style={{ marginRight: '.4rem', cursor: 'pointer' }}
                onClick={() => props.noteGym(props.note)}
            >
        💪🏼{' '}
            </span>

            <span
                role="img"
                aria-label="leaf"
                style={{ marginRight: '.4rem', cursor: 'pointer' }}
                onClick={() => props.noteWeed(props.note)}
            >
        🍁{' '}
            </span>

            <span
                role="img"
                aria-label="computer guy"
                style={{ marginRight: '.4rem', cursor: 'pointer' }}
                onClick={() => props.noteCode(props.note)}
            >
        👨🏻‍💻{' '}
            </span>

            <span
                role="img"
                aria-label="books"
                style={{ marginRight: '.4rem', cursor: 'pointer' }}
                onClick={() => props.noteRead(props.note)}
            >
        📚{' '}
            </span>

            <span
                role="img"
                aria-label="pizza"
                style={{ marginRight: '.4rem', cursor: 'pointer' }}
                onClick={() => props.noteEatOut(props.note)}
            >
        🍕{' '}
            </span>

            <span
                role="img"
                aria-label="basketball"
                style={{ marginRight: '.4rem', cursor: 'pointer' }}
                onClick={() => props.noteBasketball(props.note)}
            >
        ⛹🏻‍♂️{' '}
            </span>
        </div>
    );
}

export default Emojis;
