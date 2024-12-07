import { useEffect, useState } from "react";
import { Button, Box, TextField, Typography, Grid, Paper, Checkbox } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

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
            .map((item) => {
                item = item.replace(/\s*[\d]+[\.|\:]$/, "").trim();

                if (!item.endsWith(".")) {
                    item = item + ".";
                }
                return item;
            })
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
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [email, setEmail] = useState("");
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

    const handleCheckboxChange = (event, item) => {
        setSelectedEvent(selectedEvent === item ? null : item);
        setEmail("");
    };

    const handleEmailSubmit = (event) => {
        event.preventDefault();
        alert(`Event: ${selectedEvent}, Email: ${email}`);
        setSelectedEvent(null);
        setEmail("");
    };

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
                backgroundColor: "#0a0a0a",
                padding: 3,
                color: "#fff",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                borderRadius: "12px",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.7)",
            }}
        >
            <Paper
                sx={{
                    padding: 3,
                    width: "100%",
                    maxWidth: "800px",
                    marginTop: 4,
                    boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)",
                    marginRight: "auto",
                    backgroundColor: "#1e1e1e",
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
                                backgroundColor: "#333",
                                borderRadius: "8px",
                                "& .MuiOutlinedInput-root": {
                                    "&:hover fieldset": {
                                        borderColor: "#7f00ff",
                                    },
                                },
                                color: "#fff",
                                "& .MuiInputLabel-root": {
                                    color: "#fff",
                                },
                                "& .MuiOutlinedInput-input": {
                                    color: "#fff",
                                },
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
                                    backgroundColor: "#333",
                                    borderRadius: "8px",
                                    color: "#fff",
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
                                    backgroundColor: "#333",
                                    borderRadius: "8px",
                                    color: "#fff",
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
                                backgroundColor: "#7f00ff",
                                ":hover": { backgroundColor: "#9c27b0" },
                                marginTop: 2,
                                borderRadius: "8px",
                            }}
                            disabled={!dateStart || !dateEnd}
                        >
                            <Typography sx={{ textTransform: "capitalize", fontWeight: "bold", color: "#fff" }}>
                                Generate
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>

                {/* Result Display */}
                <Box
                    sx={{
                        marginTop: 4,
                        backgroundColor: "#1c1c1c",
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
                                        color: "#7f00ff",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {section.title}
                                </Typography>
                                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
                                    {section.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Checkbox
                                                    checked={selectedEvent === item}
                                                    onChange={(e) => handleCheckboxChange(e, item)}
                                                    sx={{
                                                        color: "#7f00ff",
                                                        "&.Mui-checked": { color: "#7f00ff" },
                                                    }}
                                                />
                                                <Typography component="p" sx={{ fontSize: 14, color: "#fff" }}>
                                                    {item}
                                                </Typography>
                                            </Box>
                                            {selectedEvent === item && (
                                                <form
                                                    onSubmit={handleEmailSubmit}
                                                    style={{
                                                        marginTop: "10px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <TextField
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: "#fff",
                                                            color: "#000",
                                                            "& .MuiInputBase-input": {
                                                                color: "#000",
                                                            },
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: "5px",
                                                                "& fieldset": {
                                                                    borderColor: "#ccc",
                                                                },
                                                                "&:hover fieldset": {
                                                                    borderColor: "#7f00ff",        },
                                                            },
                                                        }}
                                                    />
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: "#7f00ff",
                                                            ":hover": { backgroundColor: "#9c27b0" },
                                                        }}
                                                    >
                                                        Submit
                                                    </Button>
                                                </form>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        ))
                    ) : (
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                fontSize: 14,
                                color: "#888",
                                textAlign: "center",
                                fontStyle: "italic",
                            }}
                        >
                            No events found. Please enter an event to search.
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
}
