import React from 'react';
import Modal from '@mui/material/Modal/index.js';
import Box from '@mui/material/Box/index.js';
import Button from '@mui/material/Button/index.js';

function ModalPop(props) {


  return (
    <>
      <Modal
        open={props.open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className="style">
          <div>Are you sure you&apos;d like to {props.modalText}?</div>
          <Button
            className={'closeButton'}
            onClick={() => props.closeModal('Cancel')}
          >
            Close
          </Button>
          <Button
            className={'closeButton'}
            onClick={() => props.closeModal(props.modelNoteId)}
          >
           Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default ModalPop;
