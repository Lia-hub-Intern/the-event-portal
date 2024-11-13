/**
 * Developer Full Stack: Abenezer Anglo
 *
 * Create Date: 2024-11-13
 *     Program : Prompt.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Material UI
 *
 * Description:
 * - Handles the event search functionality.
 * - Updated the search result UI look.
 *
 */

import { useEffect, useState } from "react";
import { 
  Button, 
  Box, 
  TextField, 
  Typography, 
  Paper,
  Card, 
  CardContent,
  Chip,
  Divider,
  Link,
  Grid 
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { textToArray } from "../functions/Functions";
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import dayjs from 'dayjs';

const SearchResults = ({ results }) => (
  <Box sx={{ mt: 4, px: 2, maxWidth: "800px", mx: "auto" }}>
    {results.map((event, index) => (
      <Card
        key={index}
        sx={{
          mb: 3,
          p: 2,
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark' ? '0 2px 8px rgba(255,255,255,0.1)' : '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
          {/* Title with external link */}
          {event.link ? (
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontWeight: 500,
                mb: 2,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                },
              }}
              component="a"
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {event.title}
            </Typography>
          ) : (
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontWeight: 500,
                mb: 2
              }}
            >
              {event.title}
            </Typography>
          )}

          {/* Event details */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            {event.date && (
              <Chip 
                icon={<DateRangeIcon />} 
                label={event.date}
                size="small"
                variant="outlined"
              />
            )}
            {event.location && (
              <Chip
                icon={<LocationOnIcon />}
                label={event.location}
                size="small"
                variant="outlined"
              />
            )}
            {event.type && (
              <Chip
                icon={<EventIcon />}
                label={event.type}
                size="small"
                variant="outlined"
              />
            )}
          </Box>

          <Typography
            variant="body1"
            sx={{ 
              mb: 2,
              color: (theme) => theme.palette.text.secondary,
              lineHeight: 1.6
            }}
          >
            {event.description}
          </Typography>

          {/* External link button */}
          {event.link ? (
            <Button
              variant="outlined"
              color="primary"
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
              sx={{
                mt: 1,
                textTransform: 'none',
                borderRadius: 1,
              }}
            >
              Visit Event Website
            </Button>
          ) : (
            // Optionally, render nothing or a placeholder if there's no valid link
            <Typography variant="body2" color="text.secondary">
              No link available.
            </Typography>
          )}
        </CardContent>
      </Card>
    ))}
  </Box>
);

export default function Prompt() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const [cleared, setCleared] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [errorEvent, setErrorEvent] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => setCleared(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [cleared]);

  async function handleSubmit(event) {
    event.preventDefault();
    setResult([]);
    setErrorEvent({ error: false, message: "" });

    try {
      const response = await fetch("http://localhost:7000/generate", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          input: inputValue,
          dateStart: dateStart ? dateStart.format('YYYY-MM-DD') : null,
          dateEnd: dateEnd ? dateEnd.format('YYYY-MM-DD') : null
        }),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        const events = await textToArray(responseData.data);

        // Apply date filtering
        const filteredEvents = events.filter(event => {
          if (!event.dateObject || !event.dateObject.isValid()) {
            return false; // Exclude events with invalid dates
          }
          let include = true;
          if (dateStart && event.dateObject.isBefore(dateStart, 'day')) {
            include = false;
          }
          if (dateEnd && event.dateObject.isAfter(dateEnd, 'day')) {
            include = false;
          }
          return include;
        });

        if (filteredEvents.length === 0) {
          setErrorEvent({ error: true, message: "No events found within the specified date range." });
        } else {
          setResult(filteredEvents);
        }
      } else {
        const errorResponse = await response.json();
        setErrorEvent({ error: true, message: errorResponse.error });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorEvent({ error: true, message: "Failed to fetch events" });
    }

    setInputValue("");
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", p: 3 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Find Event"
              variant="outlined"
              size="small"
              error={errorEvent.error}
              helperText={errorEvent.message}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              required
              fullWidth
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  views={["year", "month", "day"]}
                  onChange={setDateStart}
                  value={dateStart}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  views={["year", "month", "day"]}
                  onChange={setDateEnd}
                  value={dateEnd}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              type="submit"
              sx={{
                alignSelf: "flex-start",
                textTransform: "capitalize",
              }}
              disabled={!inputValue.trim()}
            >
              Search Events
            </Button>
          </Box>
        </Paper>

        {result.length > 0 && <SearchResults results={result} />}
      </Box>
    </LocalizationProvider>
  );
}
