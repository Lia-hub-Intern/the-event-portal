import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

export default function Prompt() {
  const [inputValue, setInputValue] = useState("");
  const [textResponse, setTextResponse] = useState("");
  const [events, setEvents] = useState([]);
  const [errorEvent, setErrorEvent] = useState({ error: false, message: "" });
  const [chatHistory, setChatHistory] = useState([]);

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
        
        // Spara både frågan och svaret i chatthistoriken
        setChatHistory([
          ...chatHistory,
          { role: "user", content: inputValue },
          { role: "assistant", content: responseData.text }
        ]);

        // Rensa inputfältet och visa svaret
        setInputValue("");
        setTextResponse(responseData.text || "");
        setEvents(responseData.events || []);
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
    <Box sx={{ padding: 2 }}>
      {/* Chat Input */}
      <Box component="form" onSubmit={handleSubmit} autoComplete="off" sx={{ marginBottom: 2 }}>
        <Grid container>
          <Paper sx={{ padding: 2 }}>
            <TextField
              label="Skriv en fråga till ChatGPT"
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button variant="contained" size="small" type="submit">
              Skicka
            </Button>
          </Paper>
        </Grid>
      </Box>

      {/* Chat History */}
      <Box sx={{ maxHeight: "60vh", overflowY: "auto", marginBottom: 2 }}>
        {chatHistory.map((message, index) => (
          <Box key={index} sx={{ marginBottom: 1 }}>
            <Typography variant="body2" color={message.role === "user" ? "primary" : "secondary"}>
              <strong>{message.role === "user" ? "Du:" : "ChatGPT:"}</strong> {message.content}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Event Cards */}
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

      {/* Error Message */}
      {errorEvent.error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {errorEvent.message}
        </Typography>
      )}
    </Box>
  );
}
