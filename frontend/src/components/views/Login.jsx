import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Custom hook for auth context

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // "Remember me" state
  const navigate = useNavigate();
  const location = useLocation(); // Access location to get referrer
  const { login } = useAuth(); // Custom login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message on submit

    try {
      // Use the login function from AuthContext
      const isAuthenticated = await login(username, password, rememberMe); // AuthContext's login function will handle the API call

      if (isAuthenticated) {
        setMessage("Login successful!");

        // Get the referrer path from state or default to "/dashboard"
        const redirectPath = location.state?.from || "/dashboard";
        const redirectState = location.state?.from?.state || null;
        const eventData = location.state?.event; // Get the event data from state

        setTimeout(() => {
          if (redirectPath === "/EventRegistration" && eventData) {
            navigate(redirectPath, { state: { event: eventData } });
          } else {
            navigate(redirectPath, { state: redirectState }); // Redirect to intended page with state
          }
        }, 2000);
      } else {
        setMessage("Login failed: Invalid credentials");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 3 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 2,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>
        {message && (
          <Typography
            color={message.includes("successful") ? "green" : "red"}
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            {message}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            placeholder="Enter username"
            fullWidth
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            placeholder="Enter password"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)} // Toggle for "remember me"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "white",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
        <Grid container justifyContent="space-between" sx={{ marginTop: 1 }}>
          <Grid item component={NavLink} to={"/forgot-password"} sx={{ textDecoration: "none" }}>
            <Typography
              color="primary"
              sx={{
                fontSize: 14,
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary.dark",
                  fontWeight: 500,
                },
              }}
            >
              Forgot password?
            </Typography>
          </Grid>
          <Grid item component={NavLink} to={"/register"} sx={{ textDecoration: "none" }}>
            <Typography
              color="primary"
              sx={{
                fontSize: 14,
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary.dark",
                  fontWeight: 500,
                },
              }}
            >
              Sign Up
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
