/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const Textarea = (props) => {
  const characterCount = 200;
  const [noteId, setNoteId] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [postContent, setPostContent] = useState(props.note.text);
  const [trackingCharacterDeletions, setTrackingCharacterDeletions] =
    useState();

  const onChangeTextArea = (e, note) => {
    disableTextField(e, note);
    setTrackingCharacterDeletions(e.target.value);

    if (e.target.value.length > characterCount) {
      e.target.value = e.target.value.slice(0, characterCount);
    }

    insertText(e, note);
    historyUndo(e, note);
    historyRedo(e, note);
    deleteByCut(e, note);
    onPaste(e, note);
    insertFromPaste(e, note);
    deleteContentBackward(e, note);

    note['text'] = e.target.value;

    sessionStorage.setItem(note._id, JSON.stringify(note));

    return;
  };

  const disableTextField = (e, note) => {
    setReadOnly(false);
    if (readOnly) {
      if (e.nativeEvent.inputType === 'deleteContentBackward') {
        setReadOnly(false);
      }
    }

    if (
      characterCount - e.target.value.length <= 0 &&
      e.nativeEvent.inputType !== 'deleteContentBackward'
    ) {
      const numberUpdate = characterCount - e.target.value.length;
      note.textLength = numberUpdate;
      setReadOnly(true);
      return;
    }
    return;
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

  const insertText = (e, note) => {
    if (e.nativeEvent.inputType === 'insertText') {
      if (note.textLength === characterCount) {
        note.textLength = note.textLength - e.target.value.length;
        props.setNoteValue();
      } else {
        const numberUpdate = characterCount - e.target.value.length;
        note.textLength = numberUpdate;
        props.setNoteValue();
      }
    }
    return;
  };

  const historyUndo = (e, note) => {
    if (e.nativeEvent.inputType === 'historyUndo') {
      if (note.textLength === characterCount) {
        note.textLength = note.textLength - e.target.value.length;
        props.setNoteValue();
      } else {
        const numberUpdate = characterCount - e.target.value.length;
        note.textLength = numberUpdate;
        props.setNoteValue();
      }
    }
    return;
  };

  const historyRedo = (e, note) => {
    if (e.nativeEvent.inputType === 'historyRedo') {
      if (note.textLength === characterCount) {
        note.textLength = note.textLength - e.target.value.length;
        props.setNoteValue();
      } else {
        const numberUpdate = characterCount - e.target.value.length;
        note.textLength = numberUpdate;
        props.setNoteValue();
      }
    }
    return;
  };

  const deleteByCut = (e, note) => {
    if (e.nativeEvent.inputType === 'deleteByCut') {
      if (note.textLength === characterCount) {
        note.textLength = note.textLength - e.target.value.length;
        props.setNoteValue();
      } else {
        const numberUpdate = characterCount - e.target.value.length;
        note.textLength = numberUpdate;
      }
      props.setNoteValue();
    }
  };

  const onPaste = (e, note) => {
    if (e.nativeEvent.type === 'onPaste') {
      if (note.textLength === characterCount) {
        note.textLength = note.textLength - e.target.value.length;
        props.setNoteValue();
      } else {
        const numberUpdate = characterCount - e.target.value.length;
        note.textLength = numberUpdate;
        props.setNoteValue();
      }
    }
    return;
  };

  const insertFromPaste = (e, note) => {
    if (e.nativeEvent.inputType === 'insertFromPaste') {
      if (note.textLength === characterCount) {
        note.textLength = note.textLength - e.target.value.length;
        props.setNoteValue();
      } else {
        const numberUpdate = characterCount - e.target.value.length;
        note.textLength = numberUpdate;
        props.setNoteValue();
      }
    }
    return;
  };

  const deleteContentBackward = (e, note) => {
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      if (!trackingCharacterDeletions) {
        const firstDeletion = e.target.value;
        const numberUpdate =
          note.textLength + (note.text.length - firstDeletion.length);
        note.textLength = numberUpdate;
      }

      if (trackingCharacterDeletions) {
        if (trackingCharacterDeletions.length - e.target.value.length > 1) {
          const numberUpdate =
            note.textLength +
            (trackingCharacterDeletions.length - e.target.value.length);
          note.textLength = numberUpdate;
        } else {
          const numberUpdate = note.textLength + 1;
          note.textLength = numberUpdate;
        }
      }
      props.setNoteValue();
    }
    return;
  };

  return (
    <>
      <textarea
        disabled={readOnly}
        style={{
          width: '94%',
          fontSize: 'medium',
          borderRadius: '5px 5px 5px 5px',
          height: '13rem',
        }}
        id="editCard"
        value={postContent}
        onChange={(e) => {
          setPostContent(e.target.value, props.note);
          onChangeTextArea(e, props.note);
        }}
        onKeyDown={(e) => checkfordelete(e, props.note)}
        onPaste={(e) => onChangeTextArea(e, props.note)}
        onClick={(e) => onChangeTextArea(e, props.note)}
      />
    </>
  );
};

export default Textarea;
