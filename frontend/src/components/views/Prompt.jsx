import { useEffect, useState } from "react";
import { Button, Box, TextField, Typography, Grid, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from 'react';


export function textToArray(text) {
  const sections = text.split("**");
  const parsedData = [];

  for (let i = 1; i < sections.length; i += 2) {
    const title = sections[i].trim();
    const rawItems = sections[i + 1]
      .trim()
      .split(/\n(?=\d+\.\s)/);

    const items = rawItems
      .map((item) => item.replace(/^\d+\.\s*/, "").trim())
      .filter((item) => item);

    parsedData.push({ title, items });
  }
  return parsedData;
}

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
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [result, cleared]);

  async function handleSubmit(event) {
    event.preventDefault();
    setResult([]);
    setErrorEvent({ error: false, message: "" });

    const dataPrompt = {
      input: inputValue,
      dateStart: dateStart ? dateStart.toISOString() : null,
      dateEnd: dateEnd ? dateEnd.toISOString() : null,
    };


    try {
      const response = await fetch("http://localhost:7000/generate", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPrompt),
      });

      if (response.ok) {
        const responseData = await response.json();
        const events = textToArray(responseData.data);
        setResult(events);
      } else {
        const errorResponse = await response.json();
        setErrorEvent({ error: true, message: errorResponse.error });
        return;
      }
    } catch (error) {
      console.log("Error:", error);
    }

    setInputValue("");
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
        marginRight: 4,
      }}
    >
      <Paper
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: "800px",
          marginTop: 4,
          boxShadow: 3,
          marginRight: "auto",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Find Event"
              variant="outlined"
              id="names"
              type="text"
              size="medium"
              error={errorEvent.error}
              helperText={errorEvent.message}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              required
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
              }}
            />
          </Grid>

          <Grid item xs={6}> {/* Taking half width for Date Start */}
            <DatePicker
              views={["month", "year"]}
              sx={{
                "& .MuiInputBase-root": {
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                },
              }}
              onChange={(newValue) => setDateStart(newValue)}
              value={dateStart}
            />
          </Grid>

          <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* Making the Date End field align to the right */}
            <DatePicker
              views={["month", "year"]}
              sx={{
                "& .MuiInputBase-root": {
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                },
              }}
              onChange={(newValue) => setDateEnd(newValue)}
              value={dateEnd}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{
                width: "50%",
                padding: "10px",
                backgroundColor: "#007bff",
                ":hover": { backgroundColor: "#0056b3" },
                marginTop: 2,
                borderRadius: "8px",
              }}
              disabled={!dateStart || !dateEnd}
            >
              <Typography sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
                Generate
              </Typography>
            </Button>
          </Grid>
        </Grid>

        {/* Result Display */}
        <Box
          sx={{
            marginTop: 4,
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: "8px",
          }}
        >
          {result.length > 0 ? (
            result.map((section, index) => (
              <Box key={index} sx={{ marginBottom: "1.5rem" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    marginBottom: "0.5rem",
                  }}
                >
                  {section.title}
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Typography
                        component="p"
                        sx={{ fontSize: 14, fontWeight: 400 }}
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            ))
          ) : (
            <Typography
              variant="body1"
              component="p"
              sx={{ fontSize: 14, color: "gray", textAlign: "center" }}
            >
              No events found. Please enter an event to search.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
