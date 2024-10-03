/**Company: INCA DEVELOPMENT AB
 
Developer Full Stack: Darwin Rengifo*
Create Date: 2024-08-24
Program : App.jsx
Path Name : incasale-dev/frontend/src
Tools : NodeJS, React, Mteria UI
*
Description:
Calls website pages through routes.
Variabler
Routes, Route  : true/false
navArrayLinks  : This variable is export as PROPS to Navbar.jsx component
sx  : Includes properties to a component
**/

// src/App.jsx
import { BrowserRouter as Router,Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer"; // Import Footer component
import { navBarLinks } from "./components/functions/Functions";
import Home from "./components/views/Home";
import Login from "./components/views/Login";
import "dayjs/locale/en-gb";
import BusinessPage from "./components/BusinessPage";
import StayOpenMinded from "./components/StayOpenMinded";
import Learn from "./components/Learn";



export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Navbar navBarLinks={navBarLinks} />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/stay-open-minded" element={<StayOpenMinded />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </Container>
      <Footer /> 
    </LocalizationProvider>
  );
}