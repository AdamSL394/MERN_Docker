/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import NoteRoutes from '../../router/noteRoutes.js';
import NoteYears from '../NoteYears/noteYears.js';
import Pagination from '@mui/material/Pagination/index.js';
import Stack from '@mui/material/Stack/index.js';
import EditingNote from '../EditNote/editingNote.js';
import ModalPop from '../Modal/index.js';
import Search from '../Search/search.js';
import Note from '../Note/index.js';
import { DateRange } from '../DateRange/index.js';
import { Box } from '@mui/system';

function Notes(props) {
    const postPerPage = 30;
    const characterCount = 200;
    const readOnly = false;
    let [currentPage, setCurrentPage] = useState(1);
    const [notes, setNotes] = useState([]);
    const { user } = useAuth0();
    const [currentCall, setCurrentCall] = useState('Recently Changed');
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [modelNoteId, setModelNoteId] = useState();

    useEffect(() => {
        getRecentlyChangedNotes();
    }, []);

    const handelPageNumer = (getNotes, value) => {
        if (value) {
            currentPage = value;
            setCurrentPage(value);
        }
        const indexOfLastPost = currentPage * postPerPage;
        const indexOfFirstPost = indexOfLastPost - postPerPage;
        const currentPosts = getNotes.slice(indexOfFirstPost, indexOfLastPost);
        return currentPosts;
    };

    const getRecentlyChangedNotes = async (value, editingNote) => {
        try {
            const userid = user.sub.split('|')[1];
            const getNotes = await NoteRoutes.getRecentlyUpdatedNotes(userid);
            if (!checkNoteApiResponse(getNotes)) {
                return;
            }

            const currentPosts = handelPageNumer(getNotes, value);
            if (editingNote) {
                for (const list of currentPosts) {
                    if (list._id === editingNote._id) {
                        if (list.text.length === 0) {
                            list.textLength = 200;
                        } else {
                            const numberUpdate = characterCount - list.text.length;
                            list.textLength = numberUpdate;
                        }
                    }
                }
            }

            setNotes(currentPosts);
            setNumberOfPages(Math.ceil(getNotes.length / postPerPage));
        } catch (e) {
            console.log('error', e.message);
        }
    };

    const editNote = (note) => {
        note.textLength = 200 - note.text.length;
        note.edit = true;
        sessionStorage.setItem(note._id, JSON.stringify(note));
        updateNote(note);
    };

    const saveNote = (note, value) => {
        const updatedNote = JSON.parse(sessionStorage.getItem(note._id));
        if (updatedNote != null) {
            updatedNote.edit = false;
            note.edit = false;
            sessionStorage.setItem(updatedNote._id, JSON.stringify(updatedNote));
            updateNote(updatedNote);
        } else {
            note.edit = false;
            sessionStorage.setItem(note._id, JSON.stringify(note));
            updateNote(note);
        }
    };

    const getNoteYears = async (year, value) => {
        const userid = user.sub.split('|')[1];
        const noteYears = await NoteRoutes.getNoteRangeYear(
            userid,
            year + '-12-' + '31',
            year + '-01-' + '01',
        );
        if (!checkNoteApiResponse(noteYears)) {
            return;
        }
        const currentPosts = handelPageNumer(noteYears, value);
        setNotes(currentPosts);
        setNumberOfPages(Math.ceil(noteYears.length / postPerPage));
    };

    const setNotesBasedOnYear = async (_, year) => {
        setCurrentPage(1);
        await determineApiCall(year, 1);
    };

    const allNotes = async (value) => {
        const userid = user.sub.split('|')[1];
        const getNotes = await NoteRoutes.getAllNotes(userid);
        if (!checkNoteApiResponse(getNotes)) {
            return;
        }

        setCurrentPage(value);
        if (value) {
            currentPage = value;
        }
        const currentPosts = handelPageNumer(currentPage, getNotes);
        setNotes(currentPosts);
        setNumberOfPages(Math.ceil(getNotes.length / postPerPage));
        return;
    };

    const handleChange = async (e, value) => {
        setCurrentPage(value);
        await determineApiCall(currentCall, value);
    };

    const setNote = (note) => {
        const updatedNote = JSON.parse(sessionStorage.getItem(note._id));
        let newNote;
        if (updatedNote) {
            newNote = {
                text: updatedNote.text,
                date: updatedNote.date,
                star: updatedNote.star,
                _id: updatedNote._id,
                edit: updatedNote.edit,
                look: note.look,
                gym: note.gym,
                weed: note.weed,
                code: note.code,
                read: note.read,
                eatOut: note.eatOut,
                basketball: note.basketball,
            };
        } else {
            newNote = {
                text: note.text,
                date: note.date,
                star: note.star,
                _id: note._id,
                edit: note.edit,
                look: note.look,
                gym: note.gym,
                weed: note.weed,
                code: note.code,
                read: note.read,
                eatOut: note.eatOut,
                basketball: note.basketball,
            };
        }
        sessionStorage.setItem(note._id, JSON.stringify(newNote));
    };

    const openModal = (note) => {
        setModelNoteId(note._id);
        setOpen(true);
    };

    const closeModal = async (note) => {
        if (note !== 'Cancel') {
            setOpen(false);
            await NoteRoutes.deleteNote(note);
            allNotes(currentPage);
        }
        if (note === 'Cancel') {
            setOpen(false);
        }
    };

    const updateNote = async (note) => {
        const getNotes = await NoteRoutes.updateNote(note);
        if (!checkNoteApiResponse(getNotes)) {
            return;
        }

        for (const note of notes) {
            if (note._id === getNotes._id) {
                note.text = getNotes.text;
                note.date = getNotes.date;
                note.star = getNotes.star;
                note.edit = false;
                setNotes([...notes]);
                return;
            }
        }
    };

    const searchNotes = (searchedNotes, searchTeam) => {
        console.log(searchedNotes);
        if (searchTeam.length === 0) {
            // getRecentlyChangedNotes(currentPage);
            return;
        }
        setNotes(searchedNotes);
        return;
    };

    const getNoteRange = async (userId, start, end) => {
        if (start > end) {
            return;
        }
        if (!start || !end) {
            return;
        }
        const noteDateRange = await NoteRoutes.getNoteRange(userId, start, end);
        if (!checkNoteApiResponse(noteDateRange)) {
            return;
        }
        setNotes(noteDateRange);
    };

    const runDateSearch = (date1, date2) => {
        const userId = user.sub.split('|')[1];
        if (!date1 || !date2) {
            return;
        } else {
            getNoteRange(userId, date1, date2);
        }
    };

    const checkNoteApiResponse = (notes) => {
        if (notes.length < 1) {
            props.setNoNotes('Get started... Upload or make your first Note!');
            setNotes([]);
            return false;
        } else {
            props.setNoNotes('');
            return true;
        }
    };

    const determineApiCall = async (stringApiCall, value) => {
        switch (stringApiCall) {
        case 'All': {
            const userid = user.sub.split('|')[1];
            setCurrentCall('All');
            const getNotes = await NoteRoutes.getAllNotes(userid);
            if (!checkNoteApiResponse(getNotes)) {
                return;
            }
            const currentPosts = handelPageNumer(getNotes, value);
            setNotes(currentPosts);
            setNumberOfPages(Math.ceil(getNotes.length / postPerPage));
            break;
        }
        case 'Recently Changed': {
            const userid = user.sub.split('|')[1];
            setCurrentCall('Recently Changed');
            const getNotes = await NoteRoutes.getRecentlyUpdatedNotes(userid);
            if (!checkNoteApiResponse(getNotes)) {
                return;
            }

            const currentPosts = handelPageNumer(getNotes, value);
            setNotes(currentPosts);
            setNumberOfPages(Math.ceil(getNotes.length / postPerPage));
            break;
        }
        default: {
            setCurrentCall(stringApiCall);

            getNoteYears(stringApiCall, value);
            break;
        }
        }
    };

    const setNoteValue = () => {
        setNotes([...notes]);
    };

    return (
        <>
            <ModalPop
                note={notes}
                open={open}
                modelNoteId={modelNoteId}
                closeModal={closeModal}
            ></ModalPop>
            <Box>
                <Search searchNotes={searchNotes}></Search>
                <DateRange runDateSearch={runDateSearch}></DateRange>
            </Box>
            <Stack className="stack" style={{ position: 'absolute', top: ' 19%' }}>
                <Pagination
                    page={currentPage}
                    count={numberOfPages}
                    onChange={handleChange}
                    defaultPage={1}
                    color="primary"
                ></Pagination>
            </Stack>
            <NoteYears
                currentPage={currentPage}
                setNotesBasedOnYear={setNotesBasedOnYear}
            ></NoteYears>
            {notes.map((note, i) => {
                if (!note.edit) {
                    return (
                        <Note
                            key={i}
                            note={note}
                            openModal={openModal}
                            editNote={editNote}
                        ></Note>
                    );
                } else {
                    if (note.textLength === undefined) {
                        note.textLength = 200 - note.text.length;
                    }
                    return (
                        <EditingNote
                            key={i * 2}
                            notes={notes}
                            note={note}
                            setNoteValue={setNoteValue}
                            saveNote={saveNote}
                            openModal={openModal}
                            onStarValueChange={props.onStarValueChange}
                        ></EditingNote>
                    );
                }
            })}
        </>
    );
}

export default Notes;

Notes.propTypes = {
    onStarValueChange: PropTypes.func,
    setNoNotes: PropTypes.func,
};
