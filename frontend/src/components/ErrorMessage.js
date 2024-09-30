import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ErrorMessage = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" elevation={6} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
