/* eslint-disable indent */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NoteRoutes from '../../router/noteRoutes.js';
import NoteYears from '../NoteYears/noteYears';
import Pagination from '@mui/material/Pagination/index.js';
import Stack from '@mui/material/Stack/index.js';
import EditingNote from '../EditNote/editingNote';
import ModalPop from '../Modal/index';
import Search from '../Search/search.js';
import Note from '../Note/index.js';

function Notes(props) {
  const postPerPage = 30;
  const characterCount = 200;
  var readOnly = false;
  let [currentPage, setCurrentPage] = useState(1);
  const [notes, setNotes] = useState([]);
  const { user } = useAuth0();
  const [currentCall, setCurrentCall] = useState('Recently Changed');
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [year, setYear] = useState();
  const [modalText, setmodalText] = useState('');
  const [open, setOpen] = useState(false);
  const [modelNoteId, setModelNoteId] = useState();
  const [trackingCharacterDeletions, setTrackingCharacterDeletions] =
    useState();
  const [noteEditId, setNoteEditId] = useState();

  useEffect(() => {
    getRecentlyChangedNotes();
  }, []);

  const handelPageNumer = (value, getNotes) => {
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
      if (getNotes === undefined || getNotes.length < 1) {
        props.setNoNotes('Get started... Upload or make your first Note!');
        setNotes([]);
        return;
      }
      props.setNoNotes('');

      const currentPosts = handelPageNumer(value, getNotes);
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
      console.log('1');
      updatedNote.edit = false;
      note.edit = false;
      sessionStorage.setItem(updatedNote._id, JSON.stringify(updatedNote));
      updateNote(updatedNote);
    } else {
      console.log('2');
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
      year + '-01-' + '01'
    );
    const currentPosts = handelPageNumer(value, JSON.parse(noteYears));
    console.log(currentPosts, 'currentPosts');
    if (currentPosts === undefined || currentPosts.length < 1) {
      props.setNoNotes('Get started... Upload or make your first Note!');
      setNotes([]);
      return;
    }
    setNotes(currentPosts);
    setNumberOfPages(Math.ceil(JSON.parse(noteYears).length / postPerPage));
  };

  const setNotesBasedOnYear = async (_, year) => {
    setCurrentPage(1);
    const userid = user.sub.split('|')[1];
    if (year === 'All') {
      setCurrentCall('All');
      const getNotes = await NoteRoutes.getAllNotes(userid);
      console.log('getNotes', getNotes);
      if (getNotes === undefined || getNotes.length < 1) {
        props.setNoNotes('Get started... Upload or make your first Note!');
        setNotes([]);

        return;
      }
      const currentPosts = handelPageNumer(1, getNotes);
      setNotes(currentPosts);
      setNumberOfPages(Math.ceil(getNotes.length / postPerPage));
      return;
    }
    if (year === 'Recently Changed') {
      setCurrentCall('Recently Changed');
      const getNotes = await NoteRoutes.getRecentlyUpdatedNotes(userid);
      if (getNotes === undefined || getNotes.length < 1) {
        props.setNoNotes('Get started... Upload or make your first Note!');
        setNotes([]);
        return;
      }
      const currentPosts = handelPageNumer(1, getNotes);
      setNotes(currentPosts);
      setNumberOfPages(Math.ceil(getNotes.length / postPerPage));
      return;
    }
    setCurrentCall('Years');
    setYear(year);
    getNoteYears(year, 1);
  };

  const allNotes = async (value) => {
    const userid = user.sub.split('|')[1];
    const getNotes = await NoteRoutes.getAllNotes(userid);
    if (getNotes === undefined || getNotes.length < 1) {
      props.setNoNotes('Get started... Upload or make your first Note!');
      setNotes([]);
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
    // if (ordered === true) {
    //   setCurrentPage(value);
    //   getOrderedNotes(value);
    //   return;
    // }
    if (currentCall === 'Recently Changed') {
      getRecentlyChangedNotes(value);
      return;
    }
    if (currentCall === 'All') {
      console.log('here');
      allNotes(value);
    } else {
      getNoteYears(year, value);
    }
  };

  const noteLook = (note) => {
    if (note.look === false) {
      note.look = true;
      setNote(note);
      setNotes([...notes]);
    } else {
      note.look = false;
      setNote(note);
      setNotes([...notes]);
    }
    return;
  };

  const noteGym = (note) => {
    if (note.gym === false) {
      note.gym = true;
      setNote(note);
      setNotes([...notes]);
    } else {
      note.gym = false;
      setNote(note);
      setNotes([...notes]);
    }
  };

  const noteWeed = (note) => {
    if (note.weed === false) {
      note.weed = true;
      setNote(note);
      setNotes([...notes]);
    } else {
      note.weed = false;
      setNote(note);
      setNotes([...notes]);
    }
  };

  const noteCode = (note) => {
    if (note.code === false) {
      note.code = true;
      setNote(note);
      setNotes([...notes]);
    } else {
      note.code = false;
      setNote(note);
      setNotes([...notes]);
    }
  };

  const noteRead = (note) => {
    if (note.read === false) {
      note.read = true;
      setNote(note);
      setNotes([...notes]);
    } else {
      note.read = false;
      setNote(note);
      setNotes([...notes]);
    }
  };

  const noteEatOut = (note) => {
    if (note.eatOut === false) {
      note.eatOut = true;
      setNote(note);
      setNotes([...notes]);
    } else {
      note.eatOut = false;
      setNote(note);
      setNotes([...notes]);
    }
  };

  const noteBasketball = (note) => {
    if (note.basketball === false) {
      note.basketball = true;
      setNote(note);
      setNotes([...notes]);
    } else {
      note.basketball = false;
      setNote(note);
      setNotes([...notes]);
    }
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
      getRecentlyChangedNotes(currentPage);
    }
    if (note === 'Cancel') {
      setOpen(false);
    }
  };

  const updateNote = async (note) => {
    const getNotes = await NoteRoutes.updateNote(note);
    const cast = JSON.parse(getNotes);

    for (const note of notes) {
      if (note._id === cast._id) {
        note.text = cast.text;
        note.date = cast.date;
        note.star = cast.star;
        note.edit = false;
        setNotes([...notes]);
        return;
      }
    }
  };

  const onChangeTextArea = (e, note) => {
    setNoteEditId(note._id);
    setTrackingCharacterDeletions(e.target.value);
    let editNoteIt;
    for (const list of notes) {
      if (list._id === note._id) {
        editNoteIt = list._id;
        if (e.target.value.length > characterCount) {
          e.target.value = e.target.value.slice(0, characterCount);
        }
        if (
          editNoteIt === note._id &&
          characterCount - e.target.value.length <= 0 &&
          e.nativeEvent.inputType !== 'deleteContentBackward'
        ) {
          const numberUpdate = characterCount - e.target.value.length;
          list.textLength = numberUpdate;
          readOnly = true;
          return;
        }

        if (e.nativeEvent.inputType === 'historyUndo') {
          if (note.textLength === characterCount) {
            list.textLength = note.textLength - e.target.value.length;
            setNotes([...notes]);
          } else {
            const numberUpdate = characterCount - e.target.value.length;
            list.textLength = numberUpdate;
          }
          setNotes([...notes]);
        }

        if (e.nativeEvent.inputType === 'historyRedo') {
          if (note.textLength === characterCount) {
            list.textLength = note.textLength - e.target.value.length;
            setNotes([...notes]);
          } else {
            const numberUpdate = characterCount - e.target.value.length;
            list.textLength = numberUpdate;
          }
          setNotes([...notes]);
        }

        if (e.nativeEvent.inputType === 'deleteByCut') {
          if (note.textLength === characterCount) {
            list.textLength = note.textLength - e.target.value.length;
            setNotes([...notes]);
          } else {
            const numberUpdate = characterCount - e.target.value.length;
            list.textLength = numberUpdate;
          }
          setNotes([...notes]);
        }

        if (e.nativeEvent.type === 'onPaste') {
          if (note.textLength === characterCount) {
            list.textLength = note.textLength - e.target.value.length;
            setNotes([...notes]);
          } else {
            const numberUpdate = characterCount - e.target.value.length;
            list.textLength = numberUpdate;
          }
          setNotes([...notes]);
        }

        if (e.nativeEvent.inputType === 'insertFromPaste') {
          if (note.textLength === characterCount) {
            list.textLength = note.textLength - e.target.value.length;
            setNotes([...notes]);
          } else {
            const numberUpdate = characterCount - e.target.value.length;
            list.textLength = numberUpdate;
          }
          setNotes([...notes]);
        }

        if (e.nativeEvent.inputType === 'deleteContentBackward') {
          if (!trackingCharacterDeletions) {
            const firstDeletion = e.target.value;
            const numberUpdate =
              note.textLength + (note.text.length - firstDeletion.length);
            list.textLength = numberUpdate;
          }

          if (trackingCharacterDeletions) {
            if (trackingCharacterDeletions.length - e.target.value.length > 1) {
              const numberUpdate =
                note.textLength +
                (trackingCharacterDeletions.length - e.target.value.length);
              list.textLength = numberUpdate;
            } else {
              const numberUpdate = note.textLength + 1;
              list.textLength = numberUpdate;
            }
          }
          setNotes([...notes]);
        }

        if (e.nativeEvent.inputType === 'insertText') {
          if (note.textLength === characterCount) {
            list.textLength = note.textLength - e.target.value.length;
            setNotes([...notes]);
          } else {
            const numberUpdate = characterCount - e.target.value.length;
            list.textLength = numberUpdate;
            setNotes([...notes]);
          }
          setNotes([...notes]);
        }
      }
    }

    const updatedNote = JSON.parse(sessionStorage.getItem(note._id));
    let newNote;
    if (e.target.localName === 'input') {
      if (updatedNote) {
        newNote = {
          text: updatedNote.text,
          date: e.target.value,
          star: updatedNote.star,
          _id: updatedNote._id,
          edit: updatedNote.edit,
          look: updatedNote.look,
          gym: updatedNote.gym,
          weed: updatedNote.weed,
          code: updatedNote.code,
          read: updatedNote.read,
          eatOut: updatedNote.eatOut,
          basketball: updatedNote.basketball,
        };
      } else {
        newNote = {
          text: note.text,
          date: e.target.value,
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
      console.log('3');
      window.sessionStorage.setItem(note._id, JSON.stringify(newNote));
    } else {
      if (updatedNote) {
        newNote = {
          text: e.target.value,
          date: updatedNote.date,
          star: updatedNote.star,
          _id: updatedNote._id,
          edit: updatedNote.edit,
          look: updatedNote.look,
          gym: updatedNote.gym,
          weed: updatedNote.weed,
          code: updatedNote.code,
          read: updatedNote.read,
          eatOut: updatedNote.eatOut,
          basketball: updatedNote.basketball,
        };
      } else {
        newNote = {
          text: e.target.value,
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
      console.log('4');
      window.sessionStorage.setItem(note._id, JSON.stringify(newNote));
    }
  };

  const searchNotes = (searchedNotes, searchTeam) => {
    console.log(searchedNotes);
    if (searchTeam.length === 0) {
      //getRecentlyChangedNotes(currentPage);
      return;
    }
    setNotes(searchedNotes);
    return;
  };

  return (
    <>
      <ModalPop
        note={notes}
        modalText={modalText}
        open={open}
        modelNoteId={modelNoteId}
        closeModal={closeModal}
      ></ModalPop>
      <Search searchNotes={searchNotes}></Search>
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
            <Note note={note} openModal={openModal} editNote={editNote}></Note>
          );
        } else {
          if (note.textLength === undefined) {
            note.textLength = 200 - note.text.length;
          }
          return (
            <EditingNote
              note={note}
              noteLook={noteLook}
              noteGym={noteGym}
              noteWeed={noteWeed}
              noteCode={noteCode}
              noteRead={noteRead}
              noteEatOut={noteEatOut}
              noteBasketball={noteBasketball}
              saveNote={saveNote}
              openModal={openModal}
              onStarValueChange={props.onStarValueChange}
              onChangeTextArea={onChangeTextArea}
              checkfordelete={props.checkfordelete}
            ></EditingNote>
          );
        }
      })}
    </>
  );
}

export default Notes;
