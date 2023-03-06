/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
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
                    <div>Would you like to :</div>
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

// ModalPop.propTypes = {
//     modelNoteId: PropTypes.func,
//     closeModal: PropTypes.func,
//     open: PropTypes.boolean,
// };
