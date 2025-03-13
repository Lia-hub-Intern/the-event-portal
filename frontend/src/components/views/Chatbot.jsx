import { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChatWindow from "./ChatWindow";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const chatboxRef = useRef(null);

    const toggleChat = () => setIsOpen((prev) => !prev);

    const handleClickOutside = (event) => {
        if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
            setIsOpen(false);
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
                        bottom: 120,
                        right: 30,
                        zIndex: 1000,
                        animation: "fadeIn 0.4s ease", // Fade-in animation
                        background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                        borderRadius: "20px",
                        padding: "10px",
                        maxWidth: "350px",
                        minWidth: "300px",
                    }}
                >
                    <ChatWindow />
                </Box>
            )}

            <Box
                onClick={toggleChat}
                sx={{
                    position: "fixed",
                    bottom: 100,
                    right: 30,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                    padding: "12px 20px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                    borderRadius: "40px",
                    cursor: "pointer",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
                    },
                    transition: "all 0.3s ease-in-out",
                }}
            >
                <Box
                    component="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    sx={{
                        width: "40px",
                        height: "40px",
                        fill: "none",
                    }}
                >
                    <circle cx="32" cy="32" r="30" fill="url(#grad1)" />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#42a5f5", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#1565c0", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <ellipse cx="32" cy="28" rx="10" ry="12" fill="#ffffff" />
                    <circle cx="28" cy="28" r="2" fill="#42a5f5" />
                    <circle cx="36" cy="28" r="2" fill="#42a5f5" />
                    <path
                        d="M28 34c2 3 6 3 8 0"
                        stroke="#42a5f5"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <rect x="25" y="40" width="14" height="4" rx="2" fill="#ffffff" />
                </Box>
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#ffffff",
                        fontFamily: "'Roboto', sans-serif",
                    }}
                >
                    Chat with Us
                </Typography>
            </Box>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
}
