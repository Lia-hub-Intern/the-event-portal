import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

export default function AddSpeakerForm() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [sharedAccountId, setSharedAccountId] = useState(null); // This will hold the shared_account_id

  useEffect(() => {
    const fetchApiUrl = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/config');
        const data = await response.json();
        setApiUrl(data.apiUrl); // Set API URL from response
      } catch (error) {
        console.error('Error fetching API URL:', error);
        setMessage('Could not fetch the API URL');
      }
    };

    // Fetch the shared account ID from the user's session or profile
    const accountId = localStorage.getItem('sharedAccountId') || sessionStorage.getItem('sharedAccountId');
    console.log('Fetched Shared Account ID:', accountId); // Debugging line

    if (accountId) {
      setSharedAccountId(accountId); // Assign the shared account ID
    } else {
      console.log('No sharedAccountId found in storage');
    }

    fetchApiUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);
  
    // Validate input fields
    if (!username) {
      setMessage('All fields must be filled in.');
      setIsSubmitting(false);
      return;
    }
  
    if (!apiUrl) {
      setMessage('The API URL is not available.');
      setIsSubmitting(false);
      return;
    }
  
    console.log('Shared Account ID:', sharedAccountId);
    if (!sharedAccountId) {
      setMessage('No shared account available.');
      setIsSubmitting(false);
      return;
    }
  
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setMessage('No authentication token available.');
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Send request to add a speaker
      const response = await fetch(`${apiUrl}/api/add-speaker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          speakerUsername: username,
          sharedAccountId: sharedAccountId, // Send the shared_account_id with the request
        }),
      });
  
      const data = await response.json();
  
      // Handle response
      if (!response.ok) {
        setMessage(data.message || 'Failed to add the speaker.');
      } else {
        setMessage('The speaker has been added successfully!');
        setUsername(''); // Clear the username input after success
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // New function to handle removing speaker from shared account
  const handleRemoveSpeaker = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    if (!username) {
      setMessage('Please provide the speaker username.');
      setIsSubmitting(false);
      return;
    }

    if (!apiUrl) {
      setMessage('The API URL is not available.');
      setIsSubmitting(false);
      return;
    }

    console.log('Shared Account ID:', sharedAccountId);
    if (!sharedAccountId) {
      setMessage('No shared account available.');
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setMessage('No authentication token available.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/remove-speaker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          speakerUsername: username,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Failed to remove the speaker.');
      } else {
        setMessage('The speaker has been removed successfully!');
        setUsername(''); // Clear the username input after success
      }
    } catch (error) {
      console.error('Error removing speaker:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Manage Speaker
      </Typography>
      {message && (
        <Typography color={message.includes('successfully') ? 'green' : 'red'} sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}
      <TextField
        label="Speaker username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Adding speaker...' : 'Add new speaker to account'}
      </Button>

      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={handleRemoveSpeaker}
        disabled={isSubmitting}
        fullWidth
        sx={{ mt: 2 }}
      >
        {isSubmitting ? 'Removing speaker...' : 'Remove speaker from account'}
      </Button>
    </Box>
  );
}
