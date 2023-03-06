/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

export const TrackedEmojis = (props) => {
    return (
        <>
            <div>
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
                        <span role="img" aria-label="arm" className="emoji">
                💪🏼{' '}
                        </span>
                    ) : null}{' '}
                </span>

                <span>
                    {props.note.weed ? (
                        <span role="img" aria-label="leaf" className="emoji">
                🍁{' '}
                        </span>
                    ) : null}{' '}
                </span>

                <span>
                    {props.note.code ? (
                        <span role="img" aria-label="computer guy" className="emoji">
                👨🏻‍💻{' '}
                        </span>
                    ) : null}{' '}
                </span>

                <span>
                    {props.note.read ? (
                        <span role="img" aria-label="books" className="emoji">
                📚{' '}
                        </span>
                    ) : null}{' '}
                </span>

                <span>
                    {props.note.eatOut ? (
                        <span role="img" aria-label="pizza" className="emoji">
                🍕{' '}
                        </span>
                    ) : null}{' '}
                </span>

                <span>
                    {props.note.basketball ? (
                        <span role="img" aria-label="basketball" className="emoji">
                ⛹🏻‍♂️{' '}
                        </span>
                    ) : null}{' '}
                </span>
            </div>
        </>);
};
