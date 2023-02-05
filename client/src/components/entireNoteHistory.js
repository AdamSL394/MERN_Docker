/* eslint-disable indent */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button/index.js';
import Grid from '@mui/material/Grid/index.js';
import Box from '@mui/material/Box/index.js';
import Modal from '@mui/material/Modal/index.js';
import Stack from '@mui/material/Stack/index.js';
import Container from '@mui/material/Container/index.js';
import { useAuth0 } from '@auth0/auth0-react';
import NoteRoutes from '../router/noteRoutes.js';
import Search from './search.js';
import Pagination from '@mui/material/Pagination/index.js';
import './entireNoteHistory.css';
import NoteYears from './noteYears.js';
import Notes from './notes.js';

function NoteHistory() {
  const startingSearchDate = new Date();
  const { user } = useAuth0();
  const [noNotes, setnoNotes] = useState();
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [modelNoteId, setModelNoteId] = useState();
  const userId = user.sub.split('|')[1];
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [modalText, setmodalText] = useState('');
  const [numberOfPages, setNumberOfPages] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [postPerPage, setPostsPerPage] = useState(30);
  const [startDate, setStartDate] = useState(
    startingSearchDate.toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState();
  const [readOnly, setReadyOnly] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [noteEditId, setNoteEditId] = useState();
  const [trackingCharacterDeletions, setTrackingCharacterDeletions] =
    useState();
  const [noteId, setNoteId] = useState();
  const characterCount = 200;
  const [currentCall, setCurrentCall] = useState('Recently Changed');
  const [year, setYear] = useState();

  useEffect(() => {
    getRecentlyChangedNotes();
  }, []);

  const handleChange = async (e, value) => {
    if (ordered === true) {
      setCurrentPage(value);
      getOrderedNotes(value);
      return;
    }
    if (currentCall === 'Recently Changed') {
      getRecentlyChangedNotes(value);
      return;
    }
    if (currentCall === 'All') {
      allNotes(value);
    } else {
      getNoteYears(year, value);
    }
  };

  const handleOpen = (note) => {
    if (note.edit === true) {
      setmodalText('Cancel');
    }
    if (note.edit === false) {
      setmodalText('Delete');
    }
    setModelNoteId(note._id);
    setOpen(true);
  };

  const closeModal = (id) => {
    setOpen(false);
  };

  const handleClose = async (note) => {
    if (modalText === 'Delete') {
      setOpen(false);
      await NoteRoutes.deleteNote(note);
      getRecentlyChangedNotes(currentPage);
    }
    if (modalText === 'Cancel') {
      const cancelNote = await NoteRoutes.getNote(note);
      setOpen(false);
      const cast = JSON.parse(cancelNote);
      for (const note of notes) {
        if (note._id === cast[0]._id) {
          note.text = cast[0].text;
          note.date = cast[0].date;
          note.star = cast[0].star;
          note.edit = false;
          setNotes([...notes]);
          NoteRoutes.updateNote(note);
        }
      }
      for (const key of notes) {
        if (key.edit === true || cast.edit === true) {
          setDisabled(true);
          return;
        }
      }
      setDisabled(false);
      return;
    }
  };

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

  const allNotes = async (value) => {
    const userid = user.sub.split('|')[1];
    const getNotes = await NoteRoutes.getAllNotes(userid);
    if (getNotes === undefined || getNotes.length < 1) {
      setnoNotes('Get started... Upload or make your first Note!');
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

  const getRecentlyChangedNotes = async (value, editingNote) => {
    try {
      const userid = user.sub.split('|')[1];
      const getNotes = await NoteRoutes.getRecentlyUpdatedNotes(userid);
      if (getNotes === undefined || getNotes.length < 1) {
        setnoNotes('Get started... Upload or make your first Note!');
        setNotes([]);
        return;
      }
      setnoNotes('');
      for (const note of getNotes) {
        if (note.edit === true) {
          setDisabled(true);
          break;
        } else {
          setDisabled(false);
        }
      }
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

  const updateNote = async (note) => {
    const getNotes = await NoteRoutes.updateNote(note);
    const cast = JSON.parse(getNotes);
    for (const key of notes) {
      if (key.edit === true || cast.edit === true) {
        setDisabled(true);
        return;
      }
    }
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

  const onStarValueChange = (e, note) => {
    const updatedNote = JSON.parse(sessionStorage.getItem(note._id));
    let newNote;
    if (updatedNote) {
      newNote = {
        text: updatedNote.text,
        date: updatedNote.date,
        star: e.target.value,
        _id: updatedNote._id,
        edit: updatedNote.edit,
      };
    } else {
      newNote = {
        text: note.text,
        date: note.date,
        star: e.target.value,
        _id: note._id,
        edit: note.edit,
      };
    }
    sessionStorage.setItem(note._id, JSON.stringify(newNote));
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
          setReadyOnly(true);
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

  const getOrderedNotes = (value) => {
    if (value) {
      currentPage = value;
    }
    const userId = user.sub.split('|')[1];
    NoteRoutes.getNotesOrdered(userId).then((res) => {
      if (res === undefined || res.length < 1) {
        setnoNotes(['Get started... Upload or make your first Note!']);
        return;
      }
      const indexOfLastPost = currentPage * postPerPage;
      const indexOfFirstPost = indexOfLastPost - postPerPage;
      const currentPosts = res.slice(indexOfFirstPost, indexOfLastPost);
      setNotes(currentPosts);
      setNumberOfPages(Math.ceil(res.length / postPerPage));
      setOrdered(true);
    });
  };

  const handleCallBack = (searchedNotes, searchTeam) => {
    if (searchTeam.length === 0) {
      if (ordered) {
        getOrderedNotes(currentPage);
        return;
      }
      getRecentlyChangedNotes(currentPage);
      return;
    }
    setNotes(searchedNotes);
    return;
  };

  const getNoteRange = async (userId, start, end) => {
    if (start > end) {
      console.log('error');
    }
    if (!start) {
      console.log('Please Pick a Starting Date');
    }
    const resp = await NoteRoutes.getNoteRange(userId, end, start);
    const cast = JSON.parse(resp);
    const c = cast.sort((a, b) => {
      return a.date > b.date;
    });
    setNotes(c);
  };

  const setStartSearch = (e) => {
    setStartDate(e.target.value);
    if (endDate) {
      getNoteRange(userId, e.target.value, endDate);
    }
  };

  const runDateSearch = (e) => {
    const end = e.target.value;
    setEndDate(e.target.value);
    getNoteRange(userId, startDate, end);
  };

  const checkfordelete = (e, note) => {
    setNoteEditId(note._id);
    setTrackingCharacterDeletions(e.target.value);
    setNoteId(note._id);
    if (noteId !== note._id) {
      setReadyOnly(false);
    }
    if (e.key === 'Backspace') {
      setReadyOnly(false);
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

  const getNoteYears = async (year, value) => {
    const userid = user.sub.split('|')[1];
    const noteYears = await NoteRoutes.getNoteRangeYear(
      userid,
      year + '-12-' + '31',
      year + '-01-' + '01',
    );
    const currentPosts = handelPageNumer(value, JSON.parse(noteYears));
    setNotes(currentPosts);
    setNumberOfPages(Math.ceil(JSON.parse(noteYears).length / postPerPage));
  };

  const setNotesBasedOnYear = async (currentPage, year) => {
    setCurrentPage(1);
    const userid = user.sub.split('|')[1];
    if (year === 'All') {
      setCurrentCall('All');
      const getNotes = await NoteRoutes.getAllNotes(userid);
      if (getNotes === undefined || getNotes.length < 1) {
        setnoNotes('Get started... Upload or make your first Note!');
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
        setnoNotes('Get started... Upload or make your first Note!');
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

  return (
    <div>
      <Container maxWidth={false}>
        <Container>
          <Search parentCallback={handleCallBack}></Search>
          <input
            type="date"
            defaultValue={startDate}
            onChange={(e) => setStartSearch(e)}
            className="date"
          ></input>
          <input
            type="date"
            defaultValue={endDate}
            onChange={(e) => runDateSearch(e)}
            className="date"
          ></input>

          {/* <Button
                        disabled={disabled}
                        id="Orderby"
                        onClick={() => { getOrderedNotes() }}
                    >
                        Order By Date
                    </Button> */}
          <Stack className="stack">
            <Pagination
              page={currentPage}
              count={numberOfPages}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
            ></Pagination>
          </Stack>
        </Container>
        <div id="noNotes">{noNotes}</div>

        <Grid
          className="grid"
          container
          justifyContent="center"
          alignItems="flex-start"
        >
          <Modal
            open={open}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box className="style">
              <div>Are you sure you&apos;d like to {modalText}?</div>
              <Button className={'closeButton'} onClick={() => closeModal()}>
                Close
              </Button>
              <Button
                className={'closeButton'}
                onClick={() => handleClose(modelNoteId)}
              >
                {modalText}
              </Button>
            </Box>
          </Modal>
          <NoteYears
            currentPage={currentPage}
            setNotesBasedOnYear={setNotesBasedOnYear}
          ></NoteYears>
          <Notes
            notes={notes}
            handleOpen={handleOpen}
            onChangeTextArea={onChangeTextArea}
            onStarValueChange={onStarValueChange}
            noteLook={noteLook}
            noteGym={noteGym}
            noteWeed={noteWeed}
            noteCode={noteCode}
            noteRead={noteRead}
            noteEatOut={noteEatOut}
            noteBasketball={noteBasketball}
            readOnly={readOnly}
            checkfordelete={checkfordelete}
            currentPage={currentPage}
            updateNote={updateNote}
          ></Notes>
        </Grid>
      </Container>
    </div>
  );
}

export { NoteHistory };
