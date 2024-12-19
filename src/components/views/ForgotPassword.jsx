import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Email validation regex pattern
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate email and username
    if (!email || !isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (!username) {
      setMessage("Please enter your username.");
      return;
    }
  
    setLoading(true); // Start loading state
  
    try {
      const response = await fetch(`${apiUrl}/request-password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username }), // Send email and username
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset link sent! Please check your email.");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Network error: " + error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };
  
  

  return (
    <Container maxWidth="xs" sx={{ padding: 2 }}>
      <Paper sx={{ padding: 3, marginTop: 8 }}>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Enter your username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Enter your email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
        {message && (
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color: message.includes("error") ? "red" : "green",
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default ForgotPassword;
