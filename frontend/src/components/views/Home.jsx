import React from "react";
import { Container, Box } from "@mui/material";
import Hero from "./Hero";
import Values from "./Values";
import UpcomingConferences from "./UpcomingConferences";
import CustomCard from "./CustomCard";
import RecommendedEvents from "./RecommendedEvents";
import Chatbot from "./Chatbot";
import ChatWindow from "./ChatWindow";


const cardData = [
    {
        title: "Stay Open-Minded",
        text: "Embrace new ideas and perspectives. Stay curious and flexible.",
    },
    {
        title: "Stay Optimistic",
        text: "Look for the positive in every situation. Keep a hopeful outlook.",
    },
    {
        title: "Work for Love",
        text: "Do what you love and let passion guide your actions.",
    },
    {
        title: "Lend a Hand",
        text: "Be willing to help others. Share your time and skills.",
    },
    {
        title: "Work Together",
        text: "Collaborate with others to achieve common goals and foster teamwork.",
    },
    {
        title: "Give Back",
        text: "Contribute to your community and make a difference in the lives of others.",
    },
];

export default function Home() {
    return (
        <>
            <Container>
                <Hero />
                <UpcomingConferences />
                <Values />
                <Box sx={{ mt: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "20px", // Space between cards
                        }}
                    >
                        {cardData.map((card, index) => (
                            <CustomCard key={index} title={card.title} text={card.text} />
                        ))}
                    </Box>
                </Box>
                <RecommendedEvents />
            </Container>
            <Chatbot /> {/* Lägg till Chatbot här */}
        </>
    );
}
