import React from "react";

import { Box, Grid } from "@mui/material";
import CustomCard from "./CustomCard";

const cards = [
  {
    title: "Stay Open-Minded",
    text: "Keep an open mind and be receptive to new ideas.",
    link: "/stay-open-minded",
  },
  {
    title: "Stay Optimistic",
    text: "Maintain a positive outlook and encourage others.",
    link: "/stay-optimistic",
  },
  {
    title: "Work for Love",
    text: "Engage in activities driven by passion and love.",
    link: "/work-for-love",
  },
  {
    title: "Lend a Hand",
    text: "Offer help and support to those in need.",
    link: "/lend-a-hand",
  },
  {
    title: "Work Together",
    text: "Collaborate with others to achieve common goals.",
    link: "/work-together",
  },
  {
    title: "Give Back",
    text: "Contribute to the community and support charitable causes.",
    link: "/give-back",
  },
];

export default function CardContainer(){
  return (
    <>
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item key={index}>
            <CustomCard title={card.title} text={card.text} link={card.link} />
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

