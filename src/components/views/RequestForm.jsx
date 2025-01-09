import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Autocomplete,
} from "@mui/material";

const RequestForm = () => {
  const [speakers, setSpeakers] = useState([]); // Store available speakers
  const [selectedSpeaker, setSelectedSpeaker] = useState(null); // Store selected speaker
  const [eventDetails, setEventDetails] = useState(""); // Store event details
  const [error, setError] = useState(""); // Store error messages

  // Fetch speakers from the API
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getSpeakers");
        if (!response.ok) {
          throw new Error("Failed to fetch speakers");
        }
        const data = await response.json();
        setSpeakers(data);
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setError("Could not fetch speakers. Please try again later.");
      }
    };

    fetchSpeakers();
  }, []);

  // Send a request to the server
  const sendRequest = async (speakerId, eventDetails) => {
    try {
      const response = await fetch("http://localhost:5173/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ speakerId, eventDetails }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Request sent successfully!");
        setSelectedSpeaker(null);
        setEventDetails("");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("An error occurred while sending the request. Please try again later.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSpeaker && eventDetails) {
      await sendRequest(selectedSpeaker.id, eventDetails);
    } else {
      alert("Please select a speaker and fill out all fields.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: 4, sm: 6 },
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
          marginTop: 4,
          marginBottom: 4,
          width: "100%",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 4, textAlign: "center" }}>
          Submit a Request
        </Typography>

        {error && (
          <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {/* Autocomplete for selecting speaker */}
          <Autocomplete
            value={selectedSpeaker}
            onChange={(e, newValue) => setSelectedSpeaker(newValue)}
            options={speakers}
            getOptionLabel={(option) =>
              `${option.first_name} ${option.last_name}`
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Speaker"
                required
                fullWidth
                sx={{
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />

          {/* Textarea for event description */}
          <TextField
            label="Event Description"
            multiline
            rows={6}
            fullWidth
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            required
            sx={{
              marginTop: 3,
              marginBottom: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                padding: "10px",
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              padding: "12px",
              fontSize: "1rem",
              marginTop: 2,
            }}
          >
            Submit Request
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RequestForm;
