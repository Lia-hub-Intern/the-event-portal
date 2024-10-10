import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material'; // Importerar komponenter från MUI
import EventCalendar from './EventCalendar'; // Importerar EventCalendar-komponenten

export default function EventPage() {
  return (
    <Box sx={{ padding: 4 }}> {/* Lägger till padding runt sidan */}
      <Typography variant="h3" gutterBottom>
        Kommande Evenemang {/* Rubrik för kommande evenemang */}
      </Typography>
      <Grid container spacing={4}> {/* Skapar ett rutnät för att visa evenemang */}
        {/* Här kan du lägga till specifika evenemang */}
        <Grid item xs={12} sm={6} md={4}> {/* Rutnät för ett specifikt evenemang */}
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
            <Typography variant="h5">Evenemangets Titel</Typography> {/* Titel på evenemanget */}
            <Typography variant="subtitle1">Datum: 20 januari 2024</Typography> {/* Datum för evenemanget */}
            <Typography variant="body1">En kort beskrivning av evenemanget.</Typography> {/* Beskrivning av evenemanget */}
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Registrera Nu {/* Knapp för registrering */}
            </Button>
          </Box>
        </Grid>
        {/* Lägg till fler evenemang efter behov */}
      </Grid>
      
      {/* Lägg till kalendern under evenemangen */}
      <Typography variant="h4" sx={{ marginTop: 4 }}>
        Evenemangskalender {/* Rubrik för kalendern */}
      </Typography>
      <EventCalendar /> {/* Visar EventCalendar-komponenten */}
    </Box>
  );
}
