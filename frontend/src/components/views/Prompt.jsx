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
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [email, setEmail] = useState("");
    const [errorEvent, setErrorEvent] = useState({
        error: false,
        message: "",
    });
    const [showEmailField, setShowEmailField] = useState(false); // To control the email input field visibility
    const [scrollMessage, setScrollMessage] = useState(""); // New state for scroll message

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
                setShowEmailField(true); // Show email field after generate button is clicked
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
        setSelectedEvents((prevSelectedEvents) => {
            if (prevSelectedEvents.includes(item)) {
                return prevSelectedEvents.filter((event) => event !== item);
            } else {
                return [...prevSelectedEvents, item];
            }
        });

        // Scroll to email input when a checkbox is checked
        if (event.target.checked) {
            // Remove the scroll message
            setScrollMessage("");  // Clear the message

            // Scroll to the email input field
            setTimeout(() => {
                const emailField = document.querySelector("input[type='email']");
                if (emailField) {
                    emailField.scrollIntoView({ behavior: "smooth" });
                }
            }, 100); // Allow time for checkbox state change
        }
    };

    // Funktion för att skicka e-post för alla markerade events
    const handleEmailSubmit = (event) => {
        event.preventDefault(); // Förhindra att sidan laddas om

        if (email && selectedEvents.length > 0) {
            // Bygg en strukturerad lista med events och användarens email
            let eventList = selectedEvents
                .map((event, index) => `${index + 1}. ${event}`)
                .join("\n\n");  // Lägg till dubbla radbrytningar för att skapa mellanrum

            // Skapa meddelandet som vi vill visa i alerten
            let message = `Sending email to the following events:\n\n${eventList}\n\nTo: ${email}`;

            // Visa alert med strukturerat innehåll
            alert(message);

            // Reset email state and selected events after sending
            setEmail("");
            setSelectedEvents([]);
        } else {
            alert("Please enter an email and select at least one event.");
        }
    };


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",  // Align the form content to the left
                width: "100%",
                marginRight: 4,
                backgroundColor: "#0a0a0a", // Dark background
                padding: 3,
                color: "#fff",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",  // Gradient background
                borderRadius: "12px",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.7)",
                maxWidth: "100%", // Prevent the background from stretching too far
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
                        minHeight: "50px",  // Ensure space for results without excessive background size
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
                                                    checked={selectedEvents.includes(item)}
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

                {/* Show scroll message */}
                {scrollMessage && (
                    <Typography
                        id="scrollMessage"
                        sx={{
                            color: "#ffdd00",
                            textAlign: "center",
                            fontSize: "14px",
                            fontStyle: "italic",
                            marginTop: 2,
                            fontWeight: "bold",
                        }}
                    >
                        {scrollMessage}
                    </Typography>
                )}

                {/* E-mail Input and Submit Button for Multiple Events */}
                {showEmailField && selectedEvents.length > 0 && (
                    <Box sx={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                                marginBottom: "10px",
                                "& .MuiInputBase-input": {
                                    color: "#000",
                                },
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "5px",
                                    "& fieldset": {
                                        borderColor: "#ccc",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#7f00ff",
                                    },
                                },
                            }}
                        />
                        <Button
                            onClick={handleEmailSubmit}
                            variant="contained"
                            sx={{
                                backgroundColor: "#7f00ff",
                                ":hover": { backgroundColor: "#9c27b0" },
                            }}
                        >
                            Send Email to Selected Events
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}
