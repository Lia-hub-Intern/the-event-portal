import { useState } from "react";
import { useLocation, useNavigate, } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const EventRegistration = () => {
  const { isAuthenticated, user } = useAuth(); // Check if the user is authenticated and get user info
  const navigate = useNavigate(); // Initialize navigation
  const location = useLocation(); // Get current location
  const event = location.state?.event;

  const [checkedFields, setCheckedFields] = useState({
    visitor: false,
    stand: false,
    speaker: false,
    sponsorship: false,
    other: false,
  });

  const [error, setError] = useState(null); // State for error messages
  const [successMessage, setSuccessMessage] = useState(null); // State for success messages

  // Handle checkbox change
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedFields((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/login", {
        state: {
          from: location.pathname,
          event: event, // Pass the event data along
        },
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/event-registration/register', {
        user_id: user.id,
        event_id: event.id,
        registrationOptions: checkedFields,
      });

      if (response.status === 200) {
        setSuccessMessage("Registration successful!");
        setError(null);
      } else {
        setError("Registration failed. Please try again.");
        setSuccessMessage(null);
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      setSuccessMessage(null);
    }
  };

  if (!event) {
    return <div>No event selected!</div>; // Show a message if no event is passed in state
  }

  return (
    <Container
      sx={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Event Registration
        </Typography>

        <Card sx={{ width: "100%", padding: "1rem" }}>
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {event.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {event.description}
            </Typography>

            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Registration Options
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="visitor"
                    checked={checkedFields.visitor}
                    onChange={handleChange}
                  />
                }
                label="Attending as a visitor"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="stand"
                    checked={checkedFields.stand}
                    onChange={handleChange}
                  />
                }
                label="Booking a stand"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="speaker"
                    checked={checkedFields.speaker}
                    onChange={handleChange}
                  />
                }
                label="Speaking in a theatre"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="sponsorship"
                    checked={checkedFields.sponsorship}
                    onChange={handleChange}
                  />
                }
                label="Sponsorship opportunities"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="other"
                    checked={checkedFields.other}
                    onChange={handleChange}
                  />
                }
                label="Other"
              />
            </FormGroup>

            {/* Button for registration */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  padding: "0.5rem 2rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Box>

            {/* Display success or error message */}
            {successMessage && (
              <Typography
                variant="body1"
                sx={{
                  marginTop: "1rem",
                  color: "green",
                  textAlign: "center",
                }}
              >
                {successMessage}
              </Typography>
            )}
            {error && (
              <Typography
                variant="body1"
                sx={{
                  marginTop: "1rem",
                  color: "red",
                  textAlign: "center",
                }}
              >
                {error}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default EventRegistration;
