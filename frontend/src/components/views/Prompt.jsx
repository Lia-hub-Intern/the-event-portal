/**
 * Developer Full Stack: Abenezer Anglo
 *
 * Create Date: 2024-12-11
 *     Program : Prompt.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Material UI
 *
 * Description:
 * - Search for events and display the results.
 */

import axios from 'axios';
import { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function EventSearch() {
  const [inputValue, setInputValue] = useState('');
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:7000/generate', {
        input: inputValue,
        dateStart: dateStart ? dateStart.format('YYYY-MM-DD') : null,
        dateEnd: dateEnd ? dateEnd.format('YYYY-MM-DD') : null,
      });

      if (response.status === 200) {
        setEvents(response.data.events);
      } else {
        setError('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Search for Events
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for events"
              sx={{ fontSize: '1.2rem' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={dateStart}
              onChange={(newValue) => setDateStart(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={dateEnd}
              onChange={(newValue) => setDateEnd(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ fontSize: '1.2rem', display: 'block', margin: '0 auto' }}>
          Search
        </Button>
        {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
        {error && <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image || 'https://via.placeholder.com/150'}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Array.isArray(event.location) ? event.location.join(', ') : event.location}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: 2 }}
                  >
                    View Event
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
