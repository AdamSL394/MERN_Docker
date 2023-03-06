/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';


const Textarea = (props) => {
    const [trackingCharacterDeletions, setTrackingCharacterDeletions] =
    useState();
    const characterCount = 200;
    let readOnly = false;
    const [noteId, setNoteId] = useState();


    const onChangeTextArea = (e, note) => {
        setTrackingCharacterDeletions(e.target.value);
        let editNoteIt;
        for (const list of props.notes) {
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
                        props.setNoteValue();
                    } else {
                        const numberUpdate = characterCount - e.target.value.length;
                        list.textLength = numberUpdate;
                    }
                    props.setNoteValue();
                }

                if (e.nativeEvent.inputType === 'historyRedo') {
                    if (note.textLength === characterCount) {
                        list.textLength = note.textLength - e.target.value.length;
                        props.setNoteValue();
                    } else {
                        const numberUpdate = characterCount - e.target.value.length;
                        list.textLength = numberUpdate;
                    }
                    props.setNoteValue();
                }

                if (e.nativeEvent.inputType === 'deleteByCut') {
                    if (note.textLength === characterCount) {
                        list.textLength = note.textLength - e.target.value.length;
                        props.setNoteValue();
                    } else {
                        const numberUpdate = characterCount - e.target.value.length;
                        list.textLength = numberUpdate;
                    }
                    props.setNoteValue();
                }

                if (e.nativeEvent.type === 'onPaste') {
                    if (note.textLength === characterCount) {
                        list.textLength = note.textLength - e.target.value.length;
                        props.setNoteValue();
                    } else {
                        const numberUpdate = characterCount - e.target.value.length;
                        list.textLength = numberUpdate;
                    }
                    props.setNoteValue();
                }

                if (e.nativeEvent.inputType === 'insertFromPaste') {
                    if (note.textLength === characterCount) {
                        list.textLength = note.textLength - e.target.value.length;
                        props.setNoteValue();
                    } else {
                        const numberUpdate = characterCount - e.target.value.length;
                        list.textLength = numberUpdate;
                    }
                    props.setNoteValue();
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
                    props.setNoteValue();
                }

                if (e.nativeEvent.inputType === 'insertText') {
                    if (note.textLength === characterCount) {
                        list.textLength = note.textLength - e.target.value.length;
                        props.setNoteValue();
                    } else {
                        const numberUpdate = characterCount - e.target.value.length;
                        list.textLength = numberUpdate;
                        props.setNoteValue();
                    }
                    props.setNoteValue();
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
            window.sessionStorage.setItem(note._id, JSON.stringify(newNote));
        }
    };

    const checkfordelete = (e, note) => {
        setNoteId(note._id);
        if (noteId !== note._id) {
            // setReadyOnly(false);
        }
        if (e.key === 'Backspace') {
            // setReadyOnly(false);
        }
    };


    return (
        <>
            <textarea
                style={{
                    width: '94%',
                    fontSize: 'medium',
                    borderRadius: '5px 5px 5px 5px',
                    height: '13rem',
                }}
                id="editCard"
                autoFocus={true}
                readOnly={readOnly}
                onChange={(e) => onChangeTextArea(e, props.note)}
                onKeyDown={(e) => checkfordelete(e, props.note)}
                onPaste={(e) => onChangeTextArea(e, props.note)}
            >
                {props.note.text}
            </textarea>

        </>
    );
};

export default Textarea;
