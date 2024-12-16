import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Importera axios
import { Container, Paper, TextField, Typography, Button, Box } from "@mui/material";

function ResetPassword() {
  const { token } = useParams();  // Use useParams to capture the token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(null); // Initialt null för att indikera att tokenvalidering pågår
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Försök att använda axios för att validera token
      axios.get(`http://localhost:5000/reset-password?token=${token}`)
        .then(response => {
          console.log('Token validation response:', response.data); // Kontrollera här att svaret är korrekt
          if (response.data.message === "Token is valid") {
            setIsTokenValid(true); // Om token är giltig, sätt isTokenValid till true
            setMessage("");  // Rensa eventuell tidigare meddelande
          } else {
            setIsTokenValid(false); // Om token inte är giltig, sätt isTokenValid till false
            setMessage(response.data.message);  // Visa meddelandet från servern
          }
        })
        .catch(error => {
          console.error('Error validating token:', error.response ? error.response.data : error.message);
          setIsTokenValid(false);
          setMessage("Error validating token. Please try again later.");
        });
    } else {
      setIsTokenValid(false);
      setMessage("Token is missing or invalid.");
    }
  }, [token]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Error occurred while resetting password.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  // Kolla om token är null eller ogiltig
  if (isTokenValid === null) {
    return (
      <Container maxWidth="xs">
        <Paper sx={{ padding: 3, marginTop: 8 }}>
          <Typography variant="h5" align="center">
            Validating Token...
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!isTokenValid) {
    return (
      <Container maxWidth="xs">
        <Paper sx={{ padding: 3, marginTop: 8 }}>
          <Typography variant="h5" align="center" color="error">
            Token is invalid or has expired.
          </Typography>
          <Typography align="center" mt={2}>
            Please request a new password reset link.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/forgot-password')}
          >
            Request New Link
          </Button>
        </Paper>
      </Container>
    );
  }

  // Formulär för att återställa lösenord, visas endast om token är giltig
  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 3, marginTop: 8 }}>
        <Typography variant="h5" align="center">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Reset Password
          </Button>
        </Box>
        {message && (
          <Typography align="center" color="error" mt={2}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default ResetPassword;
