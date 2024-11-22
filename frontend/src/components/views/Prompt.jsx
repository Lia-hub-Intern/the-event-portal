import React, { useEffect, useState } from "react";
import { Button, Box, TextField, Typography, Grid, Paper } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
        setResult([]); // Rensa tidigare resultat
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
                console.log("Backend response:", responseData);
                setResult(responseData.data); // Uppdatera result med JSON-array
            } else {
                const errorResponse = await response.json();
                setErrorEvent({ error: true, message: errorResponse.error });
            }
        } catch (error) {
            console.error("Error in fetch:", error);
        }

        setInputValue("");
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    minHeight: "100vh",
                    padding: 4,
                    paddingTop: 8
                     }}
            >
                <Paper
                    sx={{
                        padding: 3,
                        width: "100%",
                        maxWidth: "800px",
                        backgroundColor: "#ffffff", 
                        color: "#000",
                        boxShadow: 3,
                        borderRadius: "12px",
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
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "8px",
                                    input: { color: "#000" },
                                    label: { color: "#555" },
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <DatePicker
                                views={["month", "year"]}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        width: "100%",
                                        height: "50px",
                                        backgroundColor: "#f0f0f0", 
                                        color: "#000", 
                                        borderRadius: "8px",
                                    },
                                }}
                                onChange={(newValue) => setDateStart(newValue)}
                                value={dateStart}
                            />
                        </Grid>

                        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <DatePicker
                                views={["month", "year"]}
                                sx={{
                                    "& .MuiInputBase-root": {
                                        width: "100%",
                                        height: "50px",
                                        backgroundColor: "#f0f0f0", 
                                        color: "#000",
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
                                    backgroundColor: "#1976d2",
                                    ":hover": { backgroundColor: "#115293" },
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
                            backgroundColor: "#f0f0f0",
                            padding: 3,
                            borderRadius: "12px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {result && result.length > 0 ? (
                            result.map((event, index) => (

                                <Box
                                    key={index}
                                    sx={{
                                        marginBottom: "1.5rem",
                                        padding: 2,
                                        backgroundColor: "#ffffff", 
                                        borderRadius: "8px",
                                        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#000", 
                                            marginBottom: "0.8rem",
                                        }}
                                    >
                                        {event.title}
                                    </Typography>
                                    <Typography sx={{ color: "#555" }}>Date: {event.date}</Typography>
                                    <Typography sx={{ color: "#555" }}>Location: {event.location}</Typography>
                                    <Typography sx={{ color: "#555" }}>Speakers: {event.speakers}</Typography>
                                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                                        <Typography sx={{ color: "#1976d2" }}>View Event</Typography>
                                    </a>
                                </Box>
                            ))
                        ) : (
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{
                                    fontSize: 14,
                                    color: "#555", 
                                    textAlign: "center",
                                }}
                            >
                                No events found. Please enter an event to search.
                            </Typography>
                        )}
                    </Box>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}
