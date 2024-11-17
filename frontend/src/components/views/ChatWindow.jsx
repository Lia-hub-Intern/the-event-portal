import { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.trim().toLowerCase();

    const keywords = {
        speakers: ["speaker", "speakers", "find speaker", "find speakers", "talare"],
        events: ["event", "events", "evenemang", "show events", "upcoming events"],
        conference: ["conference", "konferens", "conferences"],
        partners: ["partner", "partners", "samarbetspartner"],
        beSpeaker: ["be a speaker", "become speaker", "bli talare", "speaker registration"],
        aboutUs: ["about us", "om oss", "about the company"],
        contact: ["contact", "contact us", "support", "email"],
    };

    if (keywords.speakers.some((kw) => lowerMessage.includes(kw))) {
        return [
            {
                text: "To find a speaker, click on 'Speakers' in the top menu or visit this page: <a href='http://localhost:5173/Speakers' target='_blank'>Speakers</a>",
                isHtml: true,
            },
            {
                text: "To become a speaker with us, click on 'Be a Speaker' or follow this link: <a href='http://localhost:5173/BeASpeaker' target='_blank'>Be a Speaker</a>",
                isHtml: true,
            },
        ];
    }

    if (keywords.events.some((kw) => lowerMessage.includes(kw))) {
        return [
            {
                text: "To view our upcoming events, click on 'Events' or visit: <a href='http://localhost:5173/Events' target='_blank'>Events</a>",
                isHtml: true,
            },
        ];
    }

    if (keywords.conference.some((kw) => lowerMessage.includes(kw))) {
        return [
            {
                text: "For information about conferences, go to the 'Conference' page here: <a href='http://localhost:5173/Conference' target='_blank'>Conference</a>",
                isHtml: true,
            },
        ];
    }

    if (keywords.partners.some((kw) => lowerMessage.includes(kw))) {
        return [
            {
                text: "Want to learn more about our partners? Visit the 'Partners' page here: <a href='http://localhost:5173/Partners' target='_blank'>Partners</a>",
                isHtml: true,
            },
        ];
    }

    if (keywords.aboutUs.some((kw) => lowerMessage.includes(kw))) {
        return [
            {
                text: "Learn more about us on the 'About Us' page here: <a href='http://localhost:5173/About' target='_blank'>About Us</a>",
                isHtml: true,
            },
        ];
    }

    if (keywords.contact.some((kw) => lowerMessage.includes(kw))) {
        return [
            {
                text: "You can contact us via email at <a href='mailto:Support@liveevent.se'>Support@liveevent.se</a>",
                isHtml: true,
            },
        ];
    }

    return [
        {
            text: "I'm not sure I understand. Could you rephrase your question or be more specific?",
            isHtml: false,
        },
    ];
};

export default function ChatWindow() {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", fromAI: true, isHtml: false },
    ]);
    const [userMessage, setUserMessage] = useState("");
    const messagesEndRef = useRef(null);

    const handleSendMessage = () => {
        const trimmedMessage = userMessage.trim();
        if (!trimmedMessage) return;

        const newMessages = [...messages, { text: trimmedMessage, fromAI: false, isHtml: false }];
        setMessages(newMessages);

        const aiResponses = getAIResponse(trimmedMessage); // Get all responses for the user input
        setUserMessage("");

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                ...aiResponses.map((response) => ({ ...response, fromAI: true })),
            ]);
        }, 500);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
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
                <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </Box>
        </Box>
    );
}
