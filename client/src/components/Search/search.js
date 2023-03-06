/* eslint-disable max-len */
import React from 'react';
import Notes from '../../router/noteRoutes.js';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

function Search(props) {
    const { user } = useAuth0();

    const searchDataBase = async (e) => {
        const userId = user.sub.split('|')[1];

        const searchValue = e.target.value;
        if (searchValue === '#' || searchValue === '%' || searchValue === '\\'|| searchValue === '?' || searchValue === '/'|| searchValue === '//') {
            return;
        }
        e.preventDefault();
        const searchedNotes = await Notes.searchNote(searchValue, userId);
        props.searchNotes(searchedNotes, searchValue);
    };

    return (
        <>
            <input
                autoComplete="new-password"
                style={{
                    alignText: 'center',
                    width: '13rem',
                    height: '1.3rem',
                    position: 'absolute',
                    left: '8%',
                    top: '15%',
                }}
                type="text"
                placeholder="Search…"
                onChange={(e) => searchDataBase(e)}
            ></input>
        </>
    );
}

export default Search;


Search.propTypes = {
    searchNotes: PropTypes.func,
};
