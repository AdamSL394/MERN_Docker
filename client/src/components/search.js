/* eslint-disable max-len */
import React, {useState} from 'react';
import Notes from '../router/noteRoutes.js';
import {useAuth0} from '@auth0/auth0-react';

function Search(props) {
    // eslint-disable-next-line no-unused-vars
    const [searchTeam, setSearchTerm] = useState('');
    const {user} = useAuth0();

    const searchDataBase = async (e) => {
        const userId = user.sub.split('|')[1];
        const searchValue = e.target.value;
        if (searchValue === '#' || searchValue === '%' || searchValue === '\\') {
            return;
        }
        e.preventDefault();
        setSearchTerm(searchValue);
        const searchedNotes = await Notes.searchNote(searchValue, userId);
        // eslint-disable-next-line react/prop-types
        props.parentCallback(searchedNotes, searchValue);
    };

    return (
        <>
            <input
                autoComplete="new-password"
                style={{alignText: 'center', width: '13rem',
                    height: '1.3rem'}}
                type="text"
                placeholder="Search…"
                onChange={(e) => searchDataBase(e)}
            >
            </input>
        </>
    );
}

export default Search;
