import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, Button, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export default function UserProfile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch the current user's notification preference from the backend
    axios.get('/api/user/notification-preference')
      .then(response => {
        setNotificationsEnabled(response.data.notificationsEnabled ?? false);
      })
      .catch(error => {
        console.error('Error fetching notification preference:', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  const handleSave = () => {
    // Save the notification preference to the backend
    axios.post('/api/user/notification-preference', { notificationsEnabled })
      .then(response => {
        console.log('Notification preference saved:', response.data);
        setSuccessMessage('Notification preferences updated successfully!');
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error('Error saving notification preference:', error);
        setErrorMessage('Failed to save notification preferences.');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4">User Profile</Typography>
      {errorMessage && (
        <Typography color="error">{errorMessage}</Typography>
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={notificationsEnabled}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Enable Email Notifications"
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Preferences
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar && !!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar && !!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}