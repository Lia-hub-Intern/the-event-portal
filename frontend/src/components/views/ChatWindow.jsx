import { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import AskAI from "./AskAI"; // Import AskAI component

const predefinedOptions = [
    { label: "Become a Speaker", value: "become speaker" },
    { label: "See Speakers", value: "speakers" },
    { label: "See Events", value: "events" },
];

const otherOptions = [
    { label: "Contact Us", value: "contact" },
    { label: "About Us", value: "about" },
    { label: "Conference", value: "conference" },
    { label: "Partners", value: "partners" },
];

export default function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
    const [showOtherOptions, setShowOtherOptions] = useState(false);
    const messagesEndRef = useRef(null);

    // Function to handle sending user messages
    const handleSendMessage = (message) => {
        setMessages((prev) => [
            ...prev,
            { text: message, fromAI: false },
        ]);

        let aiReply = "AI Response: " + message;
        if (message.toLowerCase().includes("ai events")) {
            aiReply = "Here are some AI events in 2025. More details coming soon!";
        }

        setMessages((prev) => [
            ...prev,
            { text: aiReply, fromAI: true, color: "#e3f2fd" }, // Light blue color for AI answers
        ]);
    };

    const handleOptionClick = (value) => {
        handleSendMessage(value);
    };

    const handleAskAI = async (message) => {
        setMessages((prev) => [
            ...prev,
            { text: message, fromAI: false },
        ]);
        const aiResponse = await getAIResponse(message);  // Assuming getAIResponse function exists
        setMessages((prev) => [
            ...prev,
            { text: aiResponse, fromAI: true, color: "#e3f2fd" },
        ]);
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

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
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
                            "&:hover": { backgroundColor: "#1565c0" },
                        }}
                    >
                        {option.label}
                    </Button>
                ))}

                <Box sx={{ flex: "1 1 100%", position: "relative" }}>
                    <Button
                        variant="contained"
                        onClick={() => setShowOtherOptions(!showOtherOptions)}
                        sx={{
                            width: "100%",
                            textTransform: "none",
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#1565c0" },
                        }}
                    >
                        Other
                    </Button>
                    {showOtherOptions && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                width: "100%",
                                backgroundColor: "#ffffff",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                                marginTop: "4px",
                                overflow: "hidden",
                                zIndex: 10,
                            }}
                        >
                            {otherOptions.map((option) => (
                                <Button
                                    key={option.value}
                                    variant="text"
                                    onClick={() => {
                                        setShowOtherOptions(false);
                                        handleOptionClick(option.value);
                                    }}
                                    sx={{
                                        width: "100%",
                                        justifyContent: "flex-start",
                                        padding: "10px",
                                        textTransform: "none",
                                        color: "#1976d2",
                                        "&:hover": { backgroundColor: "#f0f0f0" },
                                    }}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Box>

                <Button
                    variant="contained"
                    onClick={() => setIsTextFieldVisible(true)}
                    sx={{
                        flex: "1 1 100%",
                        textTransform: "none",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#1565c0" },
                    }}
                >
                    ASK AI
                </Button>
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
                            backgroundColor: msg.fromAI ? msg.color : "#c8e6c9",  // Apply custom AI colors
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

            {isTextFieldVisible && <AskAI onSendMessage={handleAskAI} />}
        </Box>
    );
}
