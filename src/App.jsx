import { Navigate, Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navbar from "./components/navbar/Navbar";
import { navBarLinks } from "./components/functions/Functions";
import Home from "./components/views/Home";
import Login from "./components/views/Login";
import Speakers from "./components/views/Speakers";
import Events from "./components/views/Events";
import Conference from "./components/views/Conference";
import BeASpeaker from "./components/views/BeASpeaker";
import About from "./components/views/About";
import Footer from "./components/navbar/Footer";
import Partners from "./components/views/Partners";
import Register from "./components/views/Register";
import EventRegistration from "./components/views/EventRegistration";
import ScrollToTopButton from "./components/views/ScrollToTopButton";
import UsersList from "./components/views/UsersList";
import AddSpeakerForm from "./components/views/AddSpeakerForm";
import RequestsBySharedAccount from "./components/views/RequestsBySharedAccount";
import ForgotPassword from "./components/views/ForgotPassword"
import "dayjs/locale/en-gb";
import { useAuth } from "./context/AuthContext"; // Import auth context

// ProtectedRoute component to restrict access
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); // Get isAuthenticated from auth context
  const location = useLocation(); // Get the current location

  if (!isAuthenticated) {
    return (
      <Box sx={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 3 }}>
        <Typography variant="h6" color="textPrimary" paragraph>
          You must be logged in to access this page.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Please log in or create an account to continue.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            state={{ from: location.pathname }}
          >
            Log in
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/register">
            Create an Account
          </Button>
        </Box>
      </Box>
    );
  }

  return children; // Show children if authenticated
}

export default function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        {/* Navbar is now always shown */}
        <Navbar navBarLinks={navBarLinks} />
        <Container sx={{ mt: 5 }}>
          <ScrollToTopButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/speakers"
              element={<Speakers title="Find the speaker of your interest" />}
            />
            <Route
              path="/events"
              element={<Events title="Participate in the next events" />}
            />
            <Route
              path="/EventRegistration"
              element={
                <ProtectedRoute>
                  <EventRegistration />
                </ProtectedRoute>
              }
            />
            <Route path="/UsersList" element={<UsersList />} />
            <Route path="/conference" element={<Conference />} />
            <Route
              path="/partners"
              element={<Partners title="Become one of our partners" />}
            />
            <Route path="/beaspeaker"
              element={
                <ProtectedRoute>
                  <BeASpeaker />
                </ProtectedRoute>
              }
            />
            <Route path="/add-speaker" element={<AddSpeakerForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/requests/:sharedAccountId" element={<RequestsBySharedAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <Footer />
      </LocalizationProvider>
    </>
  );
}
