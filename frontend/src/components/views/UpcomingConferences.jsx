import React from "react";
import { Typography, Paper } from "@mui/material";

export default function UpcomingConferences() {
  return (
    <>
      <Paper
        sx={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          //margin: "20px 0",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{ marginBottom: "20px", fontSize: "2em", color: "#333" }}
        >
          Upcoming Conferences in November
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "15px", fontSize: "1.1em", color: "#555" }}
        >
          If you want to attend international conferences and events of your
          interest in November, you can subscribe to International Conferences
          Alerts. This service updates the forthcoming international conferences
          in November and provides a listing of important events for the month.
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "15px", fontSize: "1.1em", color: "#555" }}
        >
          Industry experts, researchers, PhD attendees, and academicians attend
          these conferences to discuss new aspects of the latest industry trends
          and encourage networking and opportunities. It will provide you with
          complete details such as date, location, topics, and information about
          the speakers who are invited to address the conferences.
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.1em", color: "#555", fontWeight: "bold" }}
        >
          <strong>Networking and Opportunities</strong>
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginTop: "15px", fontSize: "1.1em", color: "#555" }}
        >
          You can get the latest updates on your interests regarding upcoming
          conferences in November.
        </Typography>
      </Paper>
    </>
  );
}
