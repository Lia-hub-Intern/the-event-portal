import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Autocomplete,
  Alert,
} from "@mui/material";

const RequestForm = () => {
  const [speakers, setSpeakers] = useState([]); // Store available speakers
  const [selectedSpeaker, setSelectedSpeaker] = useState(null); // Store selected speaker
  const [eventDetails, setEventDetails] = useState(""); // Store event details
  const [error, setError] = useState(""); // Store error messages
  const [successMessage, setSuccessMessage] = useState(""); // Store success message
  const [isRequestSent, setIsRequestSent] = useState(false); // Flag to track if request is sent

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
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ speakerId, eventDetails }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Request sent successfully!");
        setError("");
        setSelectedSpeaker(null);
        setEventDetails("");
        setIsRequestSent(true); // Set flag to true after a successful request
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setError("An error occurred while sending the request. Please try again later.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSpeaker && eventDetails) {
      await sendRequest(selectedSpeaker.id, eventDetails);
    } else {
      setError("Please select a speaker and fill out all fields.");
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
          borderRadius: 3,
          backgroundColor: "background.paper",
          marginTop: 4,
          marginBottom: 4,
          width: "100%",
          minHeight: "80vh",
          border: "1px solid #ddd", // Added border for extra contrast
        }}
      >
        {/* Show the title and form only if the request has not been sent */}
        {!isRequestSent && (
          <>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                marginBottom: 4,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Submit a Request
            </Typography>

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
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
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        padding: "12px", // Adjusted padding for better input experience
                      },
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
                    borderRadius: "12px", // Rounded corners
                    padding: "12px", // Adjusted padding for better textarea experience
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  padding: "14px 0", // Increased padding for a better button size
                  fontSize: "1.1rem", // Slightly larger text
                  borderRadius: 3, // Rounded button corners
                  "&:hover": {
                    backgroundColor: "#1565c0", // Darker blue on hover
                  },
                }}
              >
                Submit Request
              </Button>
            </form>
          </>
        )}

        {/* Show the success message if the request has been sent */}
        {isRequestSent && (
          <Alert
            severity="success"
            sx={{
              marginBottom: 2,
              borderRadius: 4,
              fontSize: "1rem",
              backgroundColor: "#A5D6A7",
              color: "#2C6B2F",
              fontWeight: "500",
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {successMessage}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default RequestForm;
