import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Autocomplete,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Custom hook for auth context

const RequestForm = () => {
  const { isAuthenticated } = useAuth(); // Access auth context
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState([]); // Available speakers
  const [selectedSpeaker, setSelectedSpeaker] = useState(null); // Selected speaker
  const [eventDetails, setEventDetails] = useState(""); // Event details
  const [email, setEmail] = useState(""); // Email field
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // To track form submission


  // Fetch speakers from the API
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getSpeakers");
        if (!response.ok) {
          throw new Error("Failed to fetch speakers");
        }
        const data = await response.json();
        console.log("Fetched speakers:", data); // Log the fetched speakers
        setSpeakers(data);
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setError("Could not fetch speakers. Please try again later.");
      }
    };
    

    fetchSpeakers();
  }, []);

  // Send request to the server
  const sendRequest = async (speakerId, eventDetails, email) => {
    setError(""); // Clear any previous errors before sending the request

    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ speakerId, eventDetails, email }), // Include email here
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Request sent successfully!");
        setIsSubmitted(true);
        setEventDetails("");
        setEmail("");
        setSelectedSpeaker(null);

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        setError(data.message || "An error occurred while sending the request.");
      }
    } catch (error) {
      console.error("Error while sending the request:", error);
      setError(
        error.message === "Failed to fetch"
          ? "Unable to connect to the server. Please check your internet connection."
          : "An error occurred while sending the request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoading && selectedSpeaker && eventDetails.trim() && email.trim()) {
      await sendRequest(selectedSpeaker.id, eventDetails.trim(), email.trim());
    } else {
      setError("Please select a speaker, provide valid event details, and enter a valid email.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Box sx={{ padding: 4, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 4 }}>
          Submit a Request
        </Typography>

        {error && !isSubmitted && <Alert severity="error">{error}</Alert>}
        {successMessage && isSubmitted && <Alert severity="success">{successMessage}</Alert>}

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <Autocomplete
              value={selectedSpeaker}
              onChange={(e, newValue) => setSelectedSpeaker(newValue)}
              options={speakers}
              getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
              renderInput={(params) => (
                <TextField {...params} label="Select Speaker" required fullWidth sx={{ marginBottom: 3 }} />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />

            <TextField
              label="Event Description"
              multiline
              rows={4}
              fullWidth
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              required
              sx={{ marginBottom: 3 }}
            />

            <TextField
              label="Your Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ marginBottom: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                padding: "12px",
                fontSize: "1rem",
                borderRadius: 3,
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Submit Request
            </Button>
          </form>
        ) : (
          <Button
            variant="contained"
            fullWidth
            sx={{
              padding: "12px",
              fontSize: "1rem",
              borderRadius: 3,
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another Request
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default RequestForm;
