import React, { useEffect, useState } from 'react';
import Search from '../Search/search.js';
import { useAuth0 } from '@auth0/auth0-react';
import { DateRange } from '../DateRange/index.js';
import NoteYears from '../NoteYears/noteYears.js';
import NoteRoutes from '../../router/noteRoutes.js';
import PropTypes from 'prop-types';

export const SearchNotes = (props) => {
  const [noteYears, setNoteYears] = useState([]);
  const { user } = useAuth0();
  const [currentDbCall, setCurrentDBCall] = useState('All');

  useEffect(() => {
    getNoteYears();
  }, []);

  const searchNotes = async (searchedNotes, searchTerm) => {
    props.setSearchNoteResults(searchedNotes);
    if (searchTerm.length === 0) {
      props.setSearchNoteResults([]);
      setCurrentDBCall('All');
      props.setNotesBasedOnYear(1, 'All');
      return;
    }
    let pagenumber = props.currentPage
    if(searchedNotes.length < 31){
      props.setCurrentPage('1')
      pagenumber = 1
    }
    props.setCurrentCall('Search');
    setCurrentDBCall('');
    const currentPosts = props.slicePosts(searchedNotes, pagenumber);
    props.setSearchedNote(currentPosts);
    props.setNumberOfPages(Math.ceil(searchedNotes.length / 30));
    return;
  };

  const getNoteYears = async () => {
    const userid = user.sub.split('|')[1];
    const fullListOfNoteYears = await NoteRoutes.getNoteYears(userid);
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
      years.push('Recently Changed', 'All');
      setNoteYears(years);
    } else return;
  };

  const notesYears = (props, year) => {
    props.setNotesBasedOnYear(props.currentpage, year);
    setCurrentDBCall(year);
  };

  const runDateSearch = (date1, date2) => {
    const userId = user.sub.split('|')[1];
    if (!date1 || !date2) {
      return;
    } else {
      setCurrentDBCall('')
      props.getNoteRange(userId, date1, date2);
    }
  };

  return (
    <>
      <Search searchNotes={searchNotes}></Search>
      <DateRange runDateSearch={runDateSearch}
      setCurrentDBCall={setCurrentDBCall}
      ></DateRange>
      <NoteYears
        noteYears={noteYears}
        currentDbCall={currentDbCall}
        notesYears={notesYears}
        currentPage={props.currentPage}
        setNotesBasedOnYear={props.setNotesBasedOnYear}
      ></NoteYears>
    </>
  );
};

SearchNotes.propTypes = {
  searchNotes: PropTypes.func,
  setNotesBasedOnYear: PropTypes.func,
  currentpage: PropTypes.number,
  runDateSearch: PropTypes.func,
};
