import { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ChatWindow from "./ChatWindow";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const chatboxRef = useRef(null);

    const toggleChat = () => {
        setIsOpen(!isOpen); // Toggle chat visibility
    };

    const handleClickOutside = (event) => {
        if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
            setIsOpen(false); // Minimize the chatbox when clicking outside
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <Box
                    ref={chatboxRef}
                    sx={{
                        position: "fixed",
                        bottom: 90,
                        right: 30,
                        zIndex: 1000,
                    }}
                >
                    <ChatWindow />
                </Box>
            )}
            <Box
                onClick={toggleChat}
                sx={{
                    position: "fixed",
                    bottom: 80,
                    right: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "#ffffff",
                    padding: "10px 15px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "50px",
                    cursor: "pointer",
                    "&:hover": {
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                        transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease-in-out",
                }}
            >
                <ChatIcon
                    sx={{
                        color: "#1976d2",
                        fontSize: "24px",
                    }}
                />
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#1976d2",
                    }}
                >
                    Chat with Us
                </Typography>
            </Box>
        </>
    );
}
