import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Button,
  Box,
  TextField,
  MenuItem,
  Typography,
  Container,
  Grid,
} from "@mui/material";

// Example country data with phone prefixes
const countries = [
  { code: "SE", name: "Sweden", prefix: "+46" },
  { code: "NO", name: "Norway", prefix: "+47" },
  { code: "DK", name: "Denmark", prefix: "+45" },
];

export default function BeASpeaker() {
  // State to store selected country and prefix
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("");

  // Function to handle country change and set phone prefix
  const handleCountryChange = (event) => {
    const selected = countries.find(
      (country) => country.code === event.target.value
    );
    setSelectedCountry(event.target.value);
    setPhonePrefix(selected ? selected.prefix : "");
  };

  return (
    <Container>
      <Button variant="text" color="primary" sx={{ marginBottom: "20px" }}>
        <KeyboardBackspaceIcon /> Take me back
      </Button>

      <Box sx={{ marginBottom: "110px" }}>
        <Typography variant="h6" component="p" sx={{ fontSize: "1.2rem" }}>
          JOIN THE FAMILY
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
          Become a speaker today!
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", marginBottom: "20px" }}
        >
          Position your brand and insights effectively towards top business
          leaders in the Nordics. Get in touch with our specialist team today to
          secure your partnership with Compony Business Forum!
        </Typography>
        <Button variant="contained" color="primary">
          Join now!
        </Button>
      </Box>

      <Box sx={{ marginBottom: "110px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Become a partner of Compony Business Forum
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", marginBottom: "20px" }}
        >
          If you are looking to make your brand known to thousands of business
          owners and to build relations with the top C-level executives, there
          is no better way to reach your audience than with a tailored
          partnership with Oslo Business Forum.
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", marginBottom: "20px" }}
        >
          Together with you, we can design a unique partnership. Our common goal
          is to increase your brand visibility and help you create meaningful
          encounters with your target audience and business executives that can
          otherwise be difficult to reach.
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", marginBottom: "20px" }}
        >
          For more information, contact us - we'd be happy to find you the best
          partnership solution.
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: "110px",
          }}
        >
          <TextField
            required
            label="Full name"
            variant="outlined"
            fullWidth
            sx={{ "& .MuiInputBase-input": { fontSize: "1.2rem" } }}
          />
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ "& .MuiInputBase-input": { fontSize: "1.2rem" } }}
          />

          {/* Country Code + Phone Number Input */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                select
                label="Country"
                variant="outlined"
                fullWidth
                value={selectedCountry}
                onChange={handleCountryChange}
                sx={{ "& .MuiInputBase-input": { fontSize: "1.2rem" } }}
              >
                {countries.map((option) => (
                  <MenuItem key={option.code} value={option.code}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8}>
              <TextField
                required
                label="Phone Number"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <>{phonePrefix}&nbsp;</>,
                }}
                sx={{ "& .MuiInputBase-input": { fontSize: "1.2rem" } }}
              />
            </Grid>
          </Grid>

          <TextField
            required
            label="Company name"
            variant="outlined"
            fullWidth
            sx={{ "& .MuiInputBase-input": { fontSize: "1.2rem" } }}
          />
          <TextField
            label="Comments"
            variant="outlined"
            fullWidth
            sx={{ "& .MuiInputBase-input": { fontSize: "1.2rem" } }}
          />
        </Box>
      </Box>
    </Container>
  );
}
