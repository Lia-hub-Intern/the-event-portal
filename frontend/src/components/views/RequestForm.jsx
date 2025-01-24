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
  const [error, setError] = useState(""); // Error message
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // To track form submission

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/RequestForm" } });
    }
  }, [isAuthenticated, navigate]);

  // Fetch speakers from the API
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/getSpeakers");
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

  // Send request to the server
  const sendRequest = async (speakerId, eventDetails) => {
    setIsLoading(true);
    setError(""); // Clear any previous errors before sending the request

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("You need to be logged in to make a request.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:7000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ speakerId, eventDetails }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Request sent successfully!");
        setIsSubmitted(true); // Mark as submitted
        setEventDetails(""); // Clear event details after successful submission
        setSelectedSpeaker(null); // Clear selected speaker

        // Hide the success message after 5 seconds
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
    if (!isLoading && selectedSpeaker && eventDetails.trim()) {
      await sendRequest(selectedSpeaker.id, eventDetails.trim());
    } else {
      setError("Please select a speaker and provide valid event details.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: "background.paper",
          marginTop: 4,
          border: "1px solid #ddd",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold" }}
        >
          Submit a Request
        </Typography>

        {error && !isSubmitted && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && isSubmitted && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Hide form components if the form has been submitted */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Autocomplete
              value={selectedSpeaker}
              onChange={(e, newValue) => setSelectedSpeaker(newValue)}
              options={speakers}
              getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Speaker"
                  required
                  fullWidth
                  sx={{ marginBottom: 3 }}
                />
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                padding: "12px",
                fontSize: "1rem",
                borderRadius: 3,
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "12px",
              fontSize: "1rem",
              borderRadius: 3,
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            onClick={() => setIsSubmitted(false)} // Reset the form to allow resubmission
          >
            Submit Another Request
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default RequestForm;
