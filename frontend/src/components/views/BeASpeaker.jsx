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

// Sample data for images and descriptions
const zigzagData = [
  {
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    image: "https://via.placeholder.com/150",
  },
  {
    image: "https://via.placeholder.com/150",
  },
  {
    image: "https://via.placeholder.com/150",
  },
];

export default function BeASpeaker() {
  // State to store selected country and prefix
  const [selectedCountry, setSelectedCountry] = useState("SE"); // Default country set to Sweden
  const [phonePrefix, setPhonePrefix] = useState("+46"); // Set default prefix for Sweden
  const [isChecked, setIsChecked] = useState(false); // State for the checkbox
  const [showMore, setShowMore] = useState(false); // State to manage "Read more" toggle

  // Function to handle country change and set phone prefix
  const handleCountryChange = (event) => {
    const selected = countries.find(
      (country) => country.code === event.target.value
    );
    setSelectedCountry(event.target.value);
    setPhonePrefix(selected ? selected.prefix : "");
  };

  // Optional: Update the phone prefix when the selected country changes
  useEffect(() => {
    const selected = countries.find(
      (country) => country.code === selectedCountry
    );
    setPhonePrefix(selected ? selected.prefix : "");
  }, [selectedCountry]);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Function to toggle "Read more"
  const handleReadMoreToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <Container>
      <Button variant="text" color="primary" sx={{ marginBottom: "10px" }}>
        <KeyboardBackspaceIcon /> Take me back
      </Button>

      <Box
        sx={{
          marginBottom: "50px", // Reduced margin
          marginTop: "50px",
          width: "100%", // Set to full width
          padding: "10px", // Add padding for spacing
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{ fontSize: "1rem", marginBottom: "14px" }}
        >
          JOIN THE FAMILY
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "14px" }} // Reduced font size
        >
          Become a speaker today!
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", marginBottom: "25px" }} // Reduced font size
        >
          Position your brand and insights effectively towards top business
          leaders in the Nordics. Get in touch with our specialist team today to
          secure your partnership with Compony Business Forum!
        </Typography>
        <Button variant="contained" color="primary">
          Join now!
        </Button>
      </Box>

      <Box
        sx={{
          marginBottom: "100px", // Reduced margin
          marginTop: "100px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "1.5rem" }} // Reduced font size
        >
          Become a partner of Compony Business Forum
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", marginBottom: "10px" }} // Reduced font size
        >
          If you are looking to make your brand known to thousands of business
          owners and to build relations with the top C-level executives, there
          is no better way to reach your audience than with a tailored
          partnership with Oslo Business Forum.
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", marginBottom: "10px" }} // Reduced font size
        >
          Together with you, we can design a unique partnership. Our common goal
          is to increase your brand visibility and help you create meaningful
          encounters with your target audience and business executives that can
          otherwise be difficult to reach.
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "1rem", marginBottom: "10px" }} // Reduced font size
        >
          For more information, contact us - we'd be happy to find you the best
          partnership solution.
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            required
            label="Full name"
            variant="outlined"
            fullWidth
            sx={{ "& .MuiInputBase-input": { fontSize: "1rem" } }} // Reduced font size
          />
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ "& .MuiInputBase-input": { fontSize: "1rem" } }} // Reduced font size
          />

          {/* Country Code + Phone Number Input */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TextField
                        select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        variant="standard"
                        SelectProps={{
                          disableUnderline: true, // Ensure the underline of the dropdown is disabled
                        }}
                        sx={{
                          "& .MuiSelect-select": {
                            paddingRight: 0,
                          },
                          "& .MuiInputBase-root": {
                            display: "flex",
                            alignItems: "center",
                            paddingRight: 0,
                          },
                        }}
                      >
                        {countries.map((option) => (
                          <MenuItem key={option.code} value={option.code}>
                            {option.name} ({option.prefix})
                          </MenuItem>
                        ))}
                      </TextField>
                    </InputAdornment>
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
            sx={{ "& .MuiInputBase-input": { fontSize: "1rem" } }} // Reduced font size
          />
          <TextField
            label="Comments"
            variant="outlined"
            fullWidth
            sx={{ "& .MuiInputBase-input": { fontSize: "1rem" } }} // Reduced font size
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
                I have read and agree to the Privacy Policy.{" "}
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

          {/* Conditional Rendering for the Privacy Policy Details */}
          {showMore && (
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", marginBottom: "10px" }} // Reduced font size
            >
              Your privacy is important to us. We are committed to protecting
              your personal information and using it responsibly. Please review
              our complete privacy policy for more details on how we collect,
              use, and protect your information.
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            disabled={!isChecked} // Disable the button if the checkbox is not checked
            sx={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "100px", // Reduced margin
          padding: "100px", // Reduced padding

          width: "100%", // Set to full width
          display: "flex", // Enable Flexbox
          flexDirection: "column", // Arrange items in a column
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="h4"
          component="h2"
          gutterBottom
        >
          Our Partners
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem", // Reduced font size
            marginBottom: "10px", // Reduced margin
            fontWeight: "bold",
          }}
        >
          We are proud to collaborate with leading organizations in the industry
          to deliver exceptional value to our clients.
        </Typography>
      </Box>

      {/* Zigzag Layout Section */}
      <Box sx={{ marginBottom: "100px", marginTop: "100px", padding: "5px" }}>
        {/* First Row */}
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs={12} md={6}>
            <img
              src={zigzagData[0].image}
              alt="Zigzag Image 1"
              style={{ width: "70%", height: "auto", margin: "0 auto" }} // Adjusted width for better fit
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginTop: "5px" }}
            >
              Brand Awareness
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", marginTop: "5px" }}
            >
              Connect your brand with the world's leading companies and position
              your company towards the top business leaders in the Nordics. Join
              us to create an outstanding brand experience at the event and
              throughout the year. {zigzagData[0].description}
            </Typography>
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid
          container
          spacing={1}
          sx={{ alignItems: "center", marginTop: "20px" }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginTop: "5px" }}
            >
              Thought Leadership
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", marginTop: "5px" }}
            >
              Your brand can take the leadon a rising issue, organizean executve
              roundtable, take part of the agenda, join our podcasts or
              webinars. Build your company's reputaion as a trusted and
              authoritative voice. {zigzagData[0].description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={zigzagData[1].image}
              alt="Zigzag Image 2"
              style={{ width: "70%", height: "auto", margin: "0 auto" }} // Adjusted width for better fit
            />
          </Grid>
        </Grid>

        {/* Third Row */}
        <Grid
          container
          spacing={1}
          sx={{ alignItems: "center", marginTop: "20px" }}
        >
          <Grid item xs={12} md={6}>
            <img
              src={zigzagData[2].image}
              alt="Zigzag Image 3"
              style={{ width: "70%", height: "auto", margin: "0 auto" }} // Adjusted width for better fit
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginTop: "5px" }}
            >
              Networking
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", marginTop: "5px" }}
            >
              Oslo Business Forum is designed to create the best conversations
              and relationships towards business leaders. At the conference you
              can easily network, book meetings and enter dialogues with your
              next business partners. {zigzagData[2].description}
            </Typography>
          </Grid>
        </Grid>

        {/* Fourth Row */}
        <Grid
          container
          spacing={1}
          sx={{ alignItems: "center", marginTop: "20px" }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginTop: "5px" }}
            >
              Lead Generation
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", marginTop: "5px" }}
            >
              Oslo Business Forum attendees are C-level executives and decision
              makers. They’re experts in their fields, and they know the next
              big thing when they see it. Could that be your company’s product?
              {zigzagData[0].description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={zigzagData[1].image}
              alt="Zigzag Image 2"
              style={{ width: "70%", height: "auto", margin: "0 auto" }} // Adjusted width for better fit
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
