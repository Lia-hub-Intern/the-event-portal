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
              //bgcolor: "secondary.main",
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
              sx={{ marginTop: 1 }}
            >
              Sign In
            </Button>
          </Box>
          <Grid container justifyContent="space-between" sx={{ marginTop: 1 }}>
            <Grid
              item
              component={NavLink} //component react router
              to={"/Forgot"}
            >
              <Typography color="primary" sx={{ fontSize: 14 }}>
                Forgot password?
              </Typography>
            </Grid>
            <Grid
              item
              component={NavLink} //component react router
              to={"/Register"}
              color="secondary"
            >
              <Typography color="primary" sx={{ fontSize: 14 }}>
                Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
