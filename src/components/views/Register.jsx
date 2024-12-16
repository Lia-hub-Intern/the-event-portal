import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('speaker');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (event) => setRole(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({}); // Reset errors before validating

    let formErrors = {};

    // Validera lösenordslängd
    if (password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long.';
    }

    // Validera att lösenorden matchar
    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords don't match.";
    }

    // Validera e-postformat
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formErrors.email = 'Invalid email format.';
    }

    // Om det finns valideringsfel, sätt felmeddelandena
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role, first_name: firstName, last_name: lastName, email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Please log in to continue.');
        setIsRegistered(true);
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Visa bara meddelandet efter registrering
  if (isRegistered) {
    return (
      <Container maxWidth="xs">
        <Paper
          sx={{
            marginTop: 8,
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: '#2e7d32',
              fontWeight: 'bold',
              lineHeight: 1.6,
              fontFamily: '"Roboto", sans-serif',
              padding: '10px 0',
            }}
          >
            Registration successful! Please log in to continue.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              fontWeight: 'bold',
              padding: '8px 16px',
            }}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  // Rendera formuläret om användaren inte är registrerad
  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          marginTop: 8,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            mx: 'auto',
            bgcolor: 'secondary.main',
            textAlign: 'center',
            mb: 2,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Register
        </Typography>
        {message && (
          <Typography
            color={message.includes('successful') ? 'green' : 'error'}
            sx={{ textAlign: 'center', mb: 2 }}
          >
            {message}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            fullWidth
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            fullWidth
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mb: 2 }}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              onChange={handleRoleChange}
              label="Role"
              required
            >
              <MenuItem value="speaker">Speaker</MenuItem>
              <MenuItem value="user_account">User</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: 'secondary.main',
              '&:hover': { bgcolor: 'secondary.dark' },
            }}
          >
            Register
          </Button>
        </Box>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'none',
                textAlign: 'right',
                '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
              }}
              component="a"
              href="/login"
            >
              Already have an account? Login
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
