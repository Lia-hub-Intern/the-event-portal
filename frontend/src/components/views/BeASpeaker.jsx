import React, { useState, useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Button,
  Box,
  TextField,
  MenuItem,
  Typography,
  Container,
  Grid,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";

// Example country data with phone prefixes
const countries = [
  { code: "SE", name: "Sweden", prefix: "+46" },
  { code: "NO", name: "Norway", prefix: "+47" },
  { code: "DK", name: "Denmark", prefix: "+45" },
];

export default function BeASpeaker() {
  const [selectedCountry, setSelectedCountry] = useState("SE"); // Default country set to Sweden
  const [phonePrefix, setPhonePrefix] = useState("+46"); // Set default prefix for Sweden
  const [isChecked, setIsChecked] = useState(false); // State for the checkbox
  const [showMore, setShowMore] = useState(false); // State to manage "Read more" toggle

  const handleCountryChange = (event) => {
    const selected = countries.find(
      (country) => country.code === event.target.value
    );
    setSelectedCountry(event.target.value);
    setPhonePrefix(selected ? selected.prefix : "");
  };

  useEffect(() => {
    const selected = countries.find(
      (country) => country.code === selectedCountry
    );
    setPhonePrefix(selected ? selected.prefix : "");
  }, [selectedCountry]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleReadMoreToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Button
        variant="text"
        color="primary"
        sx={{ marginBottom: "10px" }}
      >
        <KeyboardBackspaceIcon /> Take me back
      </Button>

      <Container>
        <Box
          sx={{
            backgroundImage: `url("https://images.unsplash.com/photo-1560439514-07abbb294a86?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3")`,
            position: "relative",
            marginBottom: "50px",
            marginTop: "50px",
            width: "100vw",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            padding: "10px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1,
            },
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              color: "#fff",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "14px" }}>
              JOIN THE FAMILY
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: "14px" }}
            >
              Become a speaker today!
            </Typography>
            <Typography sx={{ marginBottom: "25px" }}>
              Position your brand and insights effectively towards top business
              leaders in the Nordics. Get in touch with our specialist team
              today to secure your partnership with Company Business Forum!
            </Typography>
            <Button variant="contained" color="primary">
              Join now!
            </Button>
          </Container>
        </Box>

        <Box sx={{ marginBottom: "100px", marginTop: "60px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
            Become a partner of Company Business Forum
          </Typography>
          <Typography sx={{ marginBottom: "10px" }}>
            If you are looking to make your brand known to thousands of business
            owners and to build relations with the top C-level executives,
            there is no better way to reach your audience than with a tailored
            partnership with Oslo Business Forum.
          </Typography>
          <Typography sx={{ marginBottom: "10px" }}>
            Together with you, we can design a unique partnership. Our common
            goal is to increase your brand visibility and help you create
            meaningful encounters with your target audience and business
            executives that can otherwise be difficult to reach.
          </Typography>
          <Typography sx={{ marginBottom: "10px" }}>
            For more information, contact us - we'd be happy to find you the
            best partnership solution.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField required label="Full name" variant="outlined" fullWidth />
            <TextField required label="Email" variant="outlined" fullWidth />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  variant="outlined"
                  fullWidth
                >
                  {countries.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.name} ({option.prefix})
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
                    startAdornment: (
                      <InputAdornment position="start">{phonePrefix}</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              required
              label="Company name"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Comments"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label={
                <span>
                  I have read and agree to the Privacy Policy.{' '}
                  <Link
                    href="#"
                    onClick={handleReadMoreToggle}
                    color="primary"
                    underline="hover"
                  >
                    Read more
                  </Link>
                </span>
              }
            />

            {showMore && (
              <Typography sx={{ marginBottom: "10px" }}>
                Your privacy is important to us. We are committed to protecting
                your personal information and using it responsibly. Please
                review our complete privacy policy for more details on how we
                collect, use, and protect your information.
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              disabled={!isChecked}
              sx={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#aeafb0",
            textAlign: "center",
            padding: "20px",
            fontWeight: "bold",
          }}
        >
          © 2025 Company Business Forum. All rights reserved.
        </Box>
      </Container>
    </>
  );
}
