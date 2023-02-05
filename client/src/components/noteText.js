/* eslint-disable react/prop-types */
import React from 'react';

function NoteText(props) {
    return (
        <>
            {props.note.text.split('\n').map((i, key) => {
                if (!i.length > 0) {
                    return;
                }
                const firstLetter = i[0].toUpperCase();
                const restOfsentence = i.slice(1, i.length);
                return (
                    <ul key={key} style={{ textAlign: 'left' }}>
                        <li style={{ padding: '5px 3px ' }}>
                            {firstLetter + restOfsentence}
                        </li>
                    </ul>
                );
            })}
        </>
    );
}
export default NoteText;
