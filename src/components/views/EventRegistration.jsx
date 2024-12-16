import { useLocation } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, Box } from '@mui/material';

const EventRegistration = () => {
  const location = useLocation();
  const event = location.state?.event;

  if (!event) {
    return <div>No event selected!</div>; // Show a message if no event is passed in state
  }

  // Placeholder for registration logic
  const handleRegister = () => {
    // Add registration logic here
    console.log("User registered for event:", event.title);
  };
  return (
    <Container
      sx={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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
                onClick={handleRegister}
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default EventRegistration;
