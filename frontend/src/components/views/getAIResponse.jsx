import { useState } from "react";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";

// Objekt med de specifika svaren
const responses = {
    speakers: "To find a speaker, visit: <a href='http://localhost:5173/Speakers'>Speakers</a>",
    events: "To see upcoming events, visit: <a href='http://localhost:5173/Events'>Events</a>",
    "become speaker": "To become a speaker, visit: <a href='http://localhost:5173/BeASpeaker'>Be a Speaker</a>",
    "contact us": "You can contact us via email at <a href='mailto:support@liveevent.se'>support@liveevent.se</a>",
    contact: "You can contact us via email at <a href='mailto:support@liveevent.se'>support@liveevent.se</a>",
    "about us": "Learn more about us on our 'About Us' page here: <a href='http://localhost:5173/About'>About Us</a>",
    about: "Learn more about us on our 'About Us' page here: <a href='http://localhost:5173/About'>About Us</a>",
    conference: "Find details about conferences on our 'Conference' page: <a href='http://localhost:5173/Conference'>Conference</a>",
    conferens: "Find details about conferences on our 'Conference' page: <a href='http://localhost:5173/Conference'>Conference</a>",
    partners: "Learn about our partners here: <a href='http://localhost:5173/Partners'>Partners</a>",
    partes: "Learn about our partners here: <a href='http://localhost:5173/Partners'>Partners</a>",
    "ai events": "To find AI events for 2025, visit: <a href='http://localhost:5173/Events'>Events</a>"
};

const AskAI = ({ onSendMessage }) => {
    const [userMessage, setUserMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        setLoading(true);
        onSendMessage(userMessage, false);

        try {
            // Kolla om användaren frågar om något i responses-objektet
            const lowerCaseMessage = userMessage.toLowerCase();
            const responseMessage = responses[lowerCaseMessage];

            if (responseMessage) {
                // Om frågan finns i responses-objektet, använd det svaret
                onSendMessage(responseMessage, true);
            } else {
                // Om inte, kolla om det handlar om AI-events
                if (lowerCaseMessage.includes("ai")) {
                    // Här kan du lägga till din logik för att hämta AI-events, om det behövs
                    onSendMessage("To find AI events for 2025, visit: <a href='http://localhost:5173/Events'>Events</a>", true);
                } else {
                    // För andra frågor kan du ge ett generellt svar
                    onSendMessage("Sorry, I couldn't get an answer. Please try again later.", true);
                }
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
            {/* TextInput för användarens meddelande */}
            <TextField
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Ask AI a question..."
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#e3f2fd",
                    },
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                }}
                disabled={loading}
            />

            {/* Skicka-knapp */}
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
                    borderRadius: "8px",
                }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Ask AI"}
            </Button>
        </Box>
    );
};

export default AskAI;
