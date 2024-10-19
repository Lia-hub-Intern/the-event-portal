/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-08-05
 *     Program : Login.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Access login for users with membership.
 *
 */
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
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NavLink } from "react-router-dom";

export default function Login() {
  const handleSubmit = () => console.log("login");
  return (
    <>
      <Container maxWidth="xs">
        <Paper sx={{ marginTop: 8, padding: 2 }}>
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "secondary.main",
              textAlign: "center",
              mb: 1,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              placeholder="Enter username"
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
            />
            <TextField
              placeholder="Enter password"
              fullWidth
              required
              type="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 1,
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                },
              }}
            >
              <Typography variant="body2" component="span">
                Sign In
              </Typography>
            </Button>
          </Box>
          <Grid
            container
            justifyContent="space-between"
            sx={{ marginTop: 1, padding: "1rem" }}
          >
            <Grid
              item
              component={NavLink} //component react router
              to={"/Forgot"}
              sx={{ textDecoration: "none" }}
            >
              <Typography
                color="primary"
                sx={{
                  fontSize: 14,
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                  },
                }}
              >
                Forgot password?
              </Typography>
            </Grid>
            <Grid
              item
              component={NavLink} //component react router
              to={"/Register"}
              sx={{ textDecoration: "none" }}
              //color="secondary"
            >
              <Typography
                color="primary"
                sx={{
                  fontSize: 14,
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "white",
                    borderRadius: "1rem",
                    padding: "0.09rem",
                  },
                }}
              >
                Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
