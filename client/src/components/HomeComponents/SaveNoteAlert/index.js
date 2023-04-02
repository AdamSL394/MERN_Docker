import React from 'react';
import Alert from '@mui/material/Alert/index.js';

export const AlertMessage = (props) => {
  return (
    <>
      <Alert
        severity="success"
        style={{ visibility: props.successFlag, marginTop: '1%' }}
        id="successFlag"
        open={false}
      >
        {props.successMessage}
      </Alert>
      <Alert severity="error" style={{ visibility: props.errorFlag }} open={false}>
        {props.errorMessage}
      </Alert>
    </>
  );
};
