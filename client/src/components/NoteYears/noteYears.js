import React from 'react';
import Link from '@mui/material/Link/index.js';
import Grid from '@mui/material/Grid/index.js';
import PropTypes from 'prop-types';


function NoteYears(props) {

    return (
        <Grid
            style={{
                left: ' 2%',
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column-reverse',
                marginTop: '.5%',
                width: '5%',
            }}
        >
            {props.noteYears.map((year, key) => {
                if (year === props.currentDbCall) {
                    return (
                        <Grid
                            item
                            xs={0.5}
                            key={key + 11}
                            style={{
                                marginBottom: '1.5rem',
                            }}
                            container
                            direction="column"
                        >
                            <Link
                                key={key + 1}
                                style={{
                                    cursor: 'default',
                                    color: 'grey',
                                    textDecoration: 'none',
                                }}
                                className='noteYears'
                            >
                                {year}
                            </Link>
                        </Grid>
                    );
                } else {
                    return (
                        <Grid
                            item
                            xs={0.5}
                            key={key + 11}
                            style={{
                                marginBottom: '1.5rem',
                            }}
                            container
                            direction="column"
                        >
                            <Link
                                key={key + 1}
                                onClick={() => props.notesYears(props, year)}
                                className='noteYears'
                                style={{
                                    cursor: 'pointer',
                                    color: 'blue',
                                }}
                            >
                                {year}
                            </Link>
                        </Grid>
                    );
                }
            })}
        </Grid>
    );
}


export default NoteYears;

NoteYears.propTypes = {
    setNotesBasedOnYear: PropTypes.func,
    currentpage: PropTypes.number,
};
