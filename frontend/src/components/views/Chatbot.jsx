import { useState } from "react";
import { Box, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ChatWindow from "./ChatWindow";  // Importera den tidigare skapade ChatWindow-komponenten

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);  // Växla synligheten för chattfönstret
    };

    return (
        <>
            {isOpen && (
                <Box sx={{ position: "fixed", bottom: 80, right: 20 }}>
                    <ChatWindow /> {/* Visar chattfönstret när isOpen är true */}
                </Box>
            )}
            <Fab
                color="primary"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                }}
                onClick={toggleChat}  // Hantera klick för att öppna eller stänga chattfönstret
            >
                <ChatIcon />
            </Fab>
        </>
    );
}
