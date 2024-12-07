import { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const predefinedOptions = [
    { label: "Become a Speaker", value: "become speaker" },
    { label: "See Speakers", value: "speakers" },
    { label: "See Events", value: "events" },
    { label: "Other", value: "" },
];

const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.trim().toLowerCase();

    const responses = {
        speakers: "To find a speaker, visit: <a href='http://localhost:5173/Speakers'>Speakers</a>",
        events: "To see upcoming events, visit: <a href='http://localhost:5173/Events'>Events</a>",
        "become speaker":
            "To become a speaker, visit: <a href='http://localhost:5173/BeASpeaker'>Be a Speaker</a>",
        "contact us":
            "You can contact us via email at <a href='mailto:support@liveevent.se'>support@liveevent.se</a>",
        contact:
            "You can contact us via email at <a href='mailto:support@liveevent.se'>support@liveevent.se</a>",
        "about us":
            "Learn more about us on our 'About Us' page here: <a href='http://localhost:5173/About'>About Us</a>",
        about:
            "Learn more about us on our 'About Us' page here: <a href='http://localhost:5173/About'>About Us</a>",
        conference:
            "Find details about conferences on our 'Conference' page: <a href='http://localhost:5173/Conference'>Conference</a>",
        conferens:
            "Find details about conferences on our 'Conference' page: <a href='http://localhost:5173/Conference'>Conference</a>",
        partners:
            "Learn about our partners here: <a href='http://localhost:5173/Partners'>Partners</a>",
        partes:
            "Learn about our partners here: <a href='http://localhost:5173/Partners'>Partners</a>",
    };

    const getClosestMatch = (message, options) => {
        const levenshteinDistance = (a, b) => {
            const matrix = [];
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                    }
                }
            }
            return matrix[b.length][a.length];
        };

        let closestMatch = null;
        let closestDistance = Infinity;

        for (const option of options) {
            const distance = levenshteinDistance(message, option);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestMatch = option;
            }
        }

        return closestMatch;
    };

    const closestMatch = getClosestMatch(lowerMessage, Object.keys(responses));

    return responses[closestMatch] || "I'm not sure I understand. Could you rephrase your question?";
};

export default function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
    const messagesEndRef = useRef(null);

    const handleOptionClick = (value) => {
        if (value === "") {
            setIsTextFieldVisible(true);
        } else {
            handleSendMessage(value);
        }
    };

    const handleSendMessage = (message = userMessage) => {
        if (!message.trim()) return;

        setMessages((prev) => [
            ...prev,
            { text: message, fromAI: false },
            { text: getAIResponse(message), fromAI: true },
        ]);
        setUserMessage("");
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <Box
            sx={{
                width: 350,
                height: 500,
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "16px",
                }}
            >
                Welcome! How can I assist you today?
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    mb: 2,
                }}
            >
                {predefinedOptions.map((option) => (
                    <Button
                        key={option.value}
                        variant="contained"
                        onClick={() => handleOptionClick(option.value)}
                        sx={{
                            flex: "1 1 calc(50% - 8px)",
                            textTransform: "none",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                    >
                        {option.label}
                    </Button>
                ))}
            </Box>
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    marginBottom: 2,
                    padding: "5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            alignSelf: msg.fromAI ? "flex-start" : "flex-end",
                            backgroundColor: msg.fromAI ? "#e3f2fd" : "#c8e6c9",
                            color: msg.fromAI ? "#0d47a1" : "#1b5e20",
                            borderRadius: "12px",
                            padding: "10px",
                            maxWidth: "80%",
                            wordBreak: "break-word",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                ))}
                <div ref={messagesEndRef} />
            </Box>
            {isTextFieldVisible && (
                <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Type your message..."
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                backgroundColor: "#ffffff",
                            },
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage();
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => handleSendMessage()}
                        sx={{
                            backgroundColor: "#1976d2",
                            color: "#ffffff",
                            textTransform: "none",
                            padding: "0 16px",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                    >
                        Send
                    </Button>
                </Box>
            )}
        </Box>
    );
}
