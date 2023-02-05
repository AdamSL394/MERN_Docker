import React from 'react';
import Navbar from '../components/nav.js';
import './allNotes.css';
import {NoteHistory} from '../components/entireNoteHistory.js';

const AllNotes = () => {
    return (
        <>
            <Navbar></Navbar>
            <NoteHistory></NoteHistory>
        </>
    );
};
export default AllNotes;
