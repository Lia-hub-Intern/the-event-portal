/**
 * BeASpeaker
 */
import * as React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Button,
  Box,
  TextField,
  MenuItem,
  Grid,
  ListItemText,
} from "@mui/material";

export default function BeASpeaker() {
  return (
    <>
      <Button
        sx={{ marginBottom: "60px", margin }}
        variant="text"
        color="primary"
      >
        <KeyboardBackspaceIcon /> Take me back
      </Button>

      <div style={{ marginBottom: "110px" }}>
        <p style={{ fontSize: "1.2rem" }}>JOIN THE FAMILY</p>
        <h1>Become a speaker today!</h1>
        <p style={{ fontSize: "1.2rem" }}>
          Position your brand and insights effectively towards top business
          leaders in the Nordics. Get in touch with our specialist team today to
          secure your partnership with Compony Business Forum!
        </p>
        <Button variant="contained" color="primary">
          Join now!
        </Button>
      </div>
      <div>
        <h1>Become a partner of Compony Business Forum</h1>
        <p style={{ fontSize: "1.2rem" }}>
          If you are looking to make your brand known thousands of business
          owners and to build relations with the top C-level executives, there
          is no better way to reach your audience than with a tailored
          partnership with Oslo Business Forum
        </p>

        <p style={{ fontSize: "1.2rem" }}>
          Together with you, we can design a unique partnership. Our common goal
          is to increase your brand visibility and to help you create meaningful
          encounters with your target audience and with business executives that
          can otherwise be difficult to reach.
        </p>

        <p style={{ fontSize: "1.2rem" }}>
          For more information, contact us - we'd be happy to find you the best
          partnership solution.
        </p>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: "190px",
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
          <TextField
            required
            label="Input Field 3"
            variant="outlined"
            fullWidth
            sx={{ "& .MuiInputBase-input": { fontSize: "1.2rem" } }}
          />
          <TextField
            required
            label="Compony name"
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
      </div>
    </>
  );
}
