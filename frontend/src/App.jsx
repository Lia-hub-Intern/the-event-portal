<<<<<<< HEAD
/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-08-24
 *     Program : App.jsx
 *   Path Name : stagefinder/frontend/src
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Calls website pages through routes.
 * - Variabler
 *   Routes, Route  : true/false
 *   navArrayLinks  : This variable is export as PROPS to Navbar.jsx component
 *              sx  : Includes properties to a component
 *
 */
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material"; /**This way the page updates faster */
=======
import { Navigate, Route, Routes, useLocation, useNavigate, Link } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
>>>>>>> Requestform/Heba
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
<<<<<<< HEAD
import ScrollToTopButton from "./components/views/ScrollToTopButton";
import "dayjs/locale/en-gb";
import Prompt from "./components/views/Prompt";

/**
 * This function is the main function of the application.
 * It is responsible for rendering the main components of the application.
 * @returns {JSX.Element} The main components of the application.
 */
=======
import Register from "./components/views/Register";
import EventRegistration from "./components/views/EventRegistration";
import ScrollToTopButton from "./components/views/ScrollToTopButton";
import UsersList from "./components/views/UsersList";
import AddSpeakerForm from "./components/views/AddSpeakerForm";
import RequestForm from "./components/views/RequestForm";
import RequestsBySharedAccount from "./components/views/RequestsBySharedAccount";
import ForgotPassword from "./components/views/ForgotPassword"
import "dayjs/locale/en-gb";
import { useAuth } from "./context/AuthContext"; // Import auth context
import RequestsPage from "./components/views/RequestsPage";

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
          >Log in
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

>>>>>>> Requestform/Heba
export default function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
<<<<<<< HEAD
=======
        {/* Navbar is now always shown */}
>>>>>>> Requestform/Heba
        <Navbar navBarLinks={navBarLinks} />
        <Container sx={{ mt: 5 }}>
          <ScrollToTopButton />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
<<<<<<< HEAD
=======
            <Route path="/register" element={<Register />} />
>>>>>>> Requestform/Heba
            <Route
              path="/speakers"
              element={<Speakers title="Find the speaker of your interest" />}
            />
            <Route
              path="/events"
              element={<Events title="Participate in the next events" />}
            />
<<<<<<< HEAD
=======
            <Route
              path="/EventRegistration"
              element={
                <EventRegistration />
              }
            />
            <Route path="/UsersList" element={<UsersList />} />
            <Route path="/RequestsPage" element={<RequestsPage />} />
>>>>>>> Requestform/Heba
            <Route path="/conference" element={<Conference />} />
            <Route
              path="/partners"
              element={<Partners title="Become one of our partners" />}
            />
            <Route path="/beaspeaker" element={<BeASpeaker />} />
<<<<<<< HEAD
            <Route path="/about" element={<About />} />
            <Route path="/prompt" element={<Prompt />} />
=======
            <Route path="/requestform" element={<RequestForm />} />
            <Route path="/add-speaker" element={<AddSpeakerForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/requests/:sharedAccountId" element={<RequestsBySharedAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
>>>>>>> Requestform/Heba
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <Footer />
      </LocalizationProvider>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> Requestform/Heba
