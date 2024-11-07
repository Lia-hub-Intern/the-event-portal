/**
 * Developer Full Stack: Peter Molén, Darwin Rengifo, Erik berglund
 *
 * Create Date: 2024-11-05
 *     Program : prompt.jsx
 *   Path Name : the-event-portal/frontend/components/views/prompt
 *       Tools : React, Material-UI, Javascript.
 *
 * Description:
 * This component is responsible for handling user input and generating a response based on that input.
 *  It uses a form to capture the user's input, sends it to the backend for processing,
 *  and then displays the response. The component also handles errors that may occur during the process.
 *  The component is styled using Material-UI components.
 * 
 */

import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

export default function Prompt() {
  const [inputValue, setInputValue] = useState("");
  const [textResponse, setTextResponse] = useState("");
  const [events, setEvents] = useState([]);
  const [errorEvent, setErrorEvent] = useState({ error: false, message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorEvent({ error: false, message: "" });

    const dataPrompt = { input: inputValue };

    try {
      const response = await fetch("http://localhost:7000/generate", { 
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPrompt),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data from server:", responseData);
        
        // Kontrollera om det finns events och text från backend
        setTextResponse(responseData.text || "");
        setEvents(responseData.events || []);
        console.log("Events set in state:", responseData.events);
      } else {
        const errorResponse = await response.json();
        setErrorEvent({ error: true, message: errorResponse.error });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorEvent({ error: true, message: "Något gick fel vid hämtning av data" });
    }
  }

  return (
    <>
      {/* Prompt-delen */}
      <Box component="form" onSubmit={handleSubmit} autoComplete="off">
        <Grid container>
          <Paper sx={{ padding: 2 }}>
            <Grid sx={{ display: "column", width: "15rem" }}>
              <TextField
                label="Find Event"
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <Button variant="contained" size="small" type="submit">
                Generate
              </Button>
              <Box sx={{ marginTop: "1rem" }}>
                {/* Visa textsvaret */}
                <Typography variant="body1">{textResponse}</Typography>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </Box>

      {/* Visa korten bredvid prompten */}
      <Box sx={{ marginTop: '1rem' }}>
        {events.length > 0 ? (
          <Grid container spacing={2}>
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ padding: 2 }}>
                  <Typography variant="h6">{event.title || "Ingen titel"}</Typography>
                  <Typography variant="body2">Datum: {event.date || "Ej angivet"}</Typography>
                  <Typography variant="body2">Plats: {event.location || "Ej angivet"}</Typography>
                  <Typography variant="body2">{event.description || "Ingen beskrivning tillgänglig"}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            Inga event hittades.
          </Typography>
        )}
      </Box>
    </>
  );
}