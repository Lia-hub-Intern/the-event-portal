import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";


const getAIResponse = (userMessage) => {
    const responses = [
        "Hej! Hur kan jag hjälpa dig?",
        "Jag är en AI bot, och jag kan svara på dina frågor.",
        "Det låter intressant! Vad mer vill du veta?",
        "Jag är här för att hjälpa dig med vad som helst.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
};

export default function ChatWindow() {
    const [messages, setMessages] = useState([
        { text: "Hej! Jag är här för att hjälpa dig.", fromAI: true },
    ]);
    const [userMessage, setUserMessage] = useState("");

    const handleSendMessage = () => {
        if (userMessage.trim() === "") return;

        // Lägg till användarens meddelande
        const newMessages = [...messages, { text: userMessage, fromAI: false }];
        setMessages(newMessages);
        setUserMessage("");

        // Simulera ett AI-svar
        const aiResponse = getAIResponse(userMessage);
        setTimeout(() => {
            setMessages([
                ...newMessages,
                { text: aiResponse, fromAI: true },
            ]);
        }, 1000); // Fördröjning för att simulera ett AI-svar
    };

    return (
        <Box
            sx={{
                width: 300,
                backgroundColor: "white",
                boxShadow: 3,
                borderRadius: "10px",
                padding: 2,
                zIndex: 1000,
                position: "relative",
            }}
        >
            <Box sx={{ maxHeight: "300px", overflowY: "auto", marginBottom: 2 }}>
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            textAlign: msg.fromAI ? "left" : "right",
                            padding: "5px 10px",
                            marginBottom: "10px",
                            backgroundColor: msg.fromAI ? "#f0f0f0" : "#d0f0c0",
                            borderRadius: "10px",
                        }}
                    >
                        {msg.text}
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: "flex" }}>
                <TextField
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{ height: "40px" }}
                >
                    Skicka
                </Button>
            </Box>
        </Box>
    );
}
