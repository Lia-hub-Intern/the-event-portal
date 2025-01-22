import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import axios from 'axios';

const BulkPitch = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [pitchContent, setPitchContent] = useState('');

  useEffect(() => {
    // Fetch events from the backend
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data.events);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleEventSelection = (event) => {
    const { value, checked } = event.target;
    setSelectedEvents(prevSelectedEvents =>
      checked ? [...prevSelectedEvents, value] : prevSelectedEvents.filter(e => e !== value)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const bulkPitchData = {
      events: selectedEvents,
      pitchContent,
    };

    axios.post('/api/bulk-pitch', bulkPitchData)
      .then(response => {
        console.log('Bulk pitch submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting bulk pitch:', error);
      });
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Bulk Pitch to Multiple Events
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          {events.map(event => (
            <FormControlLabel
              key={event.id}
              control={
                <Checkbox
                  value={event.id}
                  onChange={handleEventSelection}
                />
              }
              label={event.title}
            />
          ))}
        </FormGroup>
        <TextField
          label="Pitch Content"
          multiline
          rows={4}
          value={pitchContent}
          onChange={(e) => setPitchContent(e.target.value)}
          fullWidth
          sx={{ mt: 3, mb: 3 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Pitch
        </Button>
      </form>
    </Box>
  );
};

export default BulkPitch;
