import { useState } from "react";
import { Box, Button, TextField, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

// Funktion för att hämta AI-evenemang
const fetchAIEvents = async (location, year) => {
    try {
        const response = await axios.get(`https://api.eventbrite.com/v3/events/search/`, {
            params: {
                q: 'AI',
                location,
                start_date: {
                    range_start: `${year}-01-01T00:00:00Z`,
                    range_end: `${year}-12-31T23:59:59Z`,
                },
                token: process.env.EVENTBRITE_API_KEY, // Lägg till API-nyckeln från miljövariabler
            }
        });

        return response.data.events;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};

const AskAI = ({ onSendMessage }) => {
    const [userMessage, setUserMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        setLoading(true);
        // Skicka användarens meddelande först
        onSendMessage(userMessage, false);

        try {
            if (userMessage.toLowerCase().includes("ai events stockholm 2025")) {
                // Hämta AI-evenemang
                const events = await fetchAIEvents('Stockholm', 2025);
                if (events.length > 0) {
                    // Skicka AI-evenemangen som svar med en mer strukturerad visning
                    const eventMessages = events.map(event => ({
                        text: (
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="h6">{event.name.text}</Typography>
                                <Typography>Date: {event.start.local}</Typography>
                                <Typography>Location: {event.location.address.localized_address_display}</Typography>
                                <Button href={event.url} target="_blank" sx={{ marginTop: 1 }}>More Info</Button>
                            </Box>
                        ),
                        fromAI: true,
                    }));
                    onSendMessage(eventMessages.map(msg => msg.text).join("\n\n"), true);
                } else {
                    onSendMessage("Sorry, I couldn't find any AI events in Stockholm for 2025.", true);
                }
            } else {
                // Om användaren ställer en generell fråga
                const response = await axios.post("http://localhost:7000/ask-ai", {
                    message: userMessage,
                });
                const aiReply = response.data.reply;
                onSendMessage(aiReply, true);
            }
        } catch (error) {
            console.error("Error getting AI response:", error);
            onSendMessage("Sorry, I couldn't get an answer. Please try again later.", true);
        } finally {
            setUserMessage("");
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)} // Uppdatera användarens meddelande
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Ask AI a question..."
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                    },
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage(); // Tillåt att skicka med Enter-tangenten
                }}
                disabled={loading}
            />
            <Button
                variant="contained"
                onClick={handleSendMessage}
                sx={{
                    backgroundColor: "#1976d2",
                    color: "#ffffff",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "#1565c0",
                    },
                }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Ask AI"}
            </Button>
        </Box>
    );
};

export default AskAI;
