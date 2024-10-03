// src/components/views/Home.jsx
import React from "react";
import Hero from "./Hero";
import Values from "./Values";
import UpcomingConferences from "./UpcomingConferences";

import { Container, Box } from "@mui/material";

import CustomCard from "./CustomCard";

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
      </Container>
    </>
  );
}
