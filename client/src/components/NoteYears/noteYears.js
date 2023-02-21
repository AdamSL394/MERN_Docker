import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NoteRoutes from '../../router/noteRoutes.js';
import Link from '@mui/material/Link/index.js';
import Grid from '@mui/material/Grid/index.js';


function NoteYears(props) {
    const [noteYears, setNoteYears] = useState([]);
    const { user } = useAuth0();
    const [currentDbCall, setCurrentDBCall] = useState('Recently Changed');

    useEffect(() => {
        getNoteYears();
    }, []);

    const getNoteYears = async () => {
        const userid = user.sub.split('|')[1];
        const fullListOfNoteYears = await NoteRoutes.getNoteYears(userid);
        // eslint-disable-next-line max-len
        if (
            fullListOfNoteYears !== undefined &&
      JSON.parse(fullListOfNoteYears)[0] !== null
        ) {
            const parsedNotes = JSON.parse(fullListOfNoteYears)[0];
            const oldestNoteDate = parsedNotes._id.split('T')[0];
            const oldestNoteJustYear = oldestNoteDate.split('-')[0];
            const currentYear = new Date().getFullYear();

            const years = [parseInt(oldestNoteJustYear)];
            let dateincrease = parseInt(oldestNoteJustYear);

            while (dateincrease !== currentYear) {
                dateincrease = dateincrease + 1;
                years.push(dateincrease);
            }
            years.push('All', 'Recently Changed');
            setNoteYears(years);
        } else return;
    };




    const notesYears = (props, year) => {
    // eslint-disable-next-line react/prop-types
        props.setNotesBasedOnYear(props.currentpage, year);
        setCurrentDBCall(year);
    };

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
            {noteYears.map((year, key) => {
                if (year === currentDbCall) {
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
                                onClick={() => notesYears(props, year)}
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
