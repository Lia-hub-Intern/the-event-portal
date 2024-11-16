import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const getAIResponse = (userMessage) => {
    const baseUrl = "http://localhost:5173";

    const lowerMessage = userMessage.toLowerCase();

    // Regular expressions for matching different queries
    const speakerRegex = /(find|look for|search)?.*(speaker|talare)/;
    const eventRegex = /(find|show|search)?.*(event|evenemang)/;
    const conferenceRegex = /(find|show|search)?.*(conference|konferens)/;
    const partnerRegex = /(find|show|search)?.*(partner|samarbetspartner)/;
    const beSpeakerRegex = /(become|register as|be a speaker|blitalare)/;
    const aboutUsRegex = /(tell me more|learn)?.*(about us|about the company)/;
    const contactRegex = /(contact|support|help|email)/;

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        return { text: "Hello! How can I assist you today?", isHtml: false };
    }

    if (contactRegex.test(lowerMessage)) {
        return {
            text: `You can contact us via email at <a href='mailto:Support@liveevent.se'>Support@liveevent.se</a>.`,
            isHtml: true,
        };
    }

    if (beSpeakerRegex.test(lowerMessage)) {
        return {
            text: `To become a speaker with us, click here: <a href='${baseUrl}/BeASpeaker' target='_blank'>Be a Speaker</a>`,
            isHtml: true,
        };
    }

    if (speakerRegex.test(lowerMessage)) {
        return {
            text: `To find a speaker, click here: <a href='${baseUrl}/Speakers' target='_blank'>Speakers</a>`,
            isHtml: true,
        };
    }

    if (eventRegex.test(lowerMessage)) {
        return {
            text: `To view upcoming events, click here: <a href='${baseUrl}/Events' target='_blank'>Events</a>`,
            isHtml: true,
        };
    }

    if (conferenceRegex.test(lowerMessage)) {
        return {
            text: `For conference information, click here: <a href='${baseUrl}/Conference' target='_blank'>Conference</a>`,
            isHtml: true,
        };
    }

    if (partnerRegex.test(lowerMessage)) {
        return {
            text: `Learn more about our partners here: <a href='${baseUrl}/Partners' target='_blank'>Partners</a>`,
            isHtml: true,
        };
    }

    if (aboutUsRegex.test(lowerMessage)) {
        return {
            text: `Learn more about us here: <a href='${baseUrl}/About' target='_blank'>About Us</a>`,
            isHtml: true,
        };
    }

    return {
        text: "I'm not sure how to help with that. Can you clarify your question?",
        isHtml: false,
    };
};

export default function ChatWindow() {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", fromAI: true, isHtml: false },
    ]);
    const [userMessage, setUserMessage] = useState("");
    const messagesEndRef = useRef(null);

    const handleSendMessage = () => {
        if (!userMessage.trim()) return;

        const newMessages = [
            ...messages,
            { text: userMessage, fromAI: false, isHtml: false },
        ];
        setMessages(newMessages);

        const aiResponse = getAIResponse(userMessage);
        setUserMessage("");

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { ...aiResponse, fromAI: true },
            ]);
        }, 1000);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <Box
            sx={{
                width: 300,
                height: 400,
                backgroundColor: "white",
                boxShadow: 3,
                borderRadius: "10px",
                padding: 2,
                zIndex: 1000,
                position: "fixed",
                bottom: 100,
                right: 20,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Chatbot
            </Typography>
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    marginBottom: 2,
                    padding: "5px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            alignSelf: msg.fromAI ? "flex-start" : "flex-end",
                            backgroundColor: msg.fromAI ? "#f0f0f0" : "#d0f0c0",
                            borderRadius: "10px",
                            padding: "10px",
                            maxWidth: "80%",
                            wordBreak: "break-word",
                        }}
                    >
                        {msg.isHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                        ) : (
                            msg.text
                        )}
                    </Box>
                ))}
                <Box ref={messagesEndRef} />
            </Box>
            <Box sx={{ display: "flex" }}>
                <TextField
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Type your message..."
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                    }}
                />
                <Button variant="contained" onClick={handleSendMessage}>
                    Send
                </Button>
            </Box>
        </Box>
    );
}
