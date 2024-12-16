import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import UserModel from './Models/UserModel.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';


// Middleware
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', // Allow frontend requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Expand allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow cookies and authorization headers
}));

app.use(express.json()); // Parse JSON payloads


// API URL endpoint
app.get('/api/config', (req, res) => {
  res.json({
    apiUrl: process.env.API_URL || 'http://localhost:5000', // API_URL from .env or default
  });
});




// === Token Generation Function ===
const generateToken = (user) => {
  // The payload is where you store user-specific data (e.g., username, role, user ID)
  const payload = {
    username: user.username,
    role: user.role,
    userId: user.id,
    shared_account_id: user.shared_account_id,
  };

  // Create the token with expiration time set to 1 hour
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  return token;
};

// === JWT Authentication Middleware ===
const authenticateJWT = (req, res, next) => {
  let token = req.headers['authorization']?.split(' ')[1]; // Try to get token from the Authorization header

  // If token is not in the header, try to get it from sessionStorage (assuming it's passed in the request body)
  if (!token && req.body.token) {
    token = req.body.token; 
  }

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user;  // Attach decoded user data to the request object
    next();
  });
};


// === ROUTER: Register User ===
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, role, first_name, last_name, email } = req.body;

    // Validera att alla obligatoriska fält finns
    if (!username || !password || !role || !first_name || !last_name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validera lösenordslängd (minst 8 tecken)
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Validera e-postformat (enkel RegEx för e-post)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Kontrollera om användaren redan finns 
    const existingUserByUsername = await UserModel.getUserByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }


    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa ny användare
    const newUser = await UserModel.createUser(
      username,
      hashedPassword,
      role,
      first_name,
      last_name,
      email
    );

    res.status(201).json({
      message: 'Registration successful! Please log in to continue.',
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Error during registration. Please try again later.' });
  }
});

// === ROUTER: Login ===
app.post('/api/login', async (req, res) => {
  const { username, password, rememberMe } = req.body;

  try {
    const user = await UserModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);  // Using generateToken to create the JWT

    res.status(200).json({
      token,
      sharedAccountId: user.shared_account_id,
      rememberMe: rememberMe,  // Return rememberMe flag in response
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Failed to login user' });
  }
});


// === ROUTER: Add Speaker ===
app.post('/api/add-speaker', authenticateJWT, async (req, res) => {
  console.log("Add Speaker route hit");

  const { speakerUsername } = req.body;
  if (!speakerUsername) {
    console.log('No speaker username provided');
    return res.status(400).json({
      message: 'Invalid input. Username is required.',
    });
  }

  try {
    const speaker = await UserModel.getUserByUsername(speakerUsername); // Fetch the user by username
    console.log('Speaker retrieved:', speaker);

    // Check if the speaker exists
    if (!speaker) {
      console.log('Speaker not found');
      return res.status(404).json({ message: 'Speaker not found.' });
    }

    // Check if the user has the 'speaker' role
    if (speaker.role !== 'speaker') {
      console.log(`User does not have the "speaker" role: ${speaker.role}`);
      return res.status(400).json({ message: 'The specified user does not have the "speaker" role.' });
    }

    // Check if the speaker is already assigned to a shared account
    if (speaker.shared_account_id) {
      console.log('Speaker already assigned to a shared account');
      return res.status(400).json({ message: 'This speaker is already assigned to a shared account.' });
    }

    // Update the speaker with the shared account ID from the authenticated user
    const updatedSpeaker = await UserModel.updateUserSharedAccountId(
      speaker.id,
      req.user.shared_account_id
    );
    console.log('Speaker updated:', updatedSpeaker);

    // Respond with success
    return res.status(200).json({
      message: 'Speaker added successfully.',
      updatedSpeaker,
    });
  } catch (error) {
    console.error('Error adding speaker:', error.message);
    return res.status(500).json({ message: 'An error occurred while adding the speaker.' });
  }
});


// === ROUTER: Remove Speaker ===
app.post('/api/remove-speaker', authenticateJWT, async (req, res) => {
  console.log("Remove Speaker route hit");

  const { speakerUsername } = req.body;
  if (!speakerUsername) {
    console.log('No speaker username provided');
    return res.status(400).json({
      message: 'Invalid input. Username is required.',
    });
  }

  try {
    // Hämta talaren från användarmodellen
    const speaker = await UserModel.getUserByUsername(speakerUsername); // Se till att du har en funktion för detta
    console.log('Speaker retrieved:', speaker);
    if (!speaker) {
      console.log('Speaker not found');
      return res.status(404).json({ message: 'Speaker not found.' });
    }

    // Ta bort talaren från det delade kontot
    const updatedSpeaker = await UserModel.removeUserFromSharedAccount(speaker.id); // Använd removeUserFromSharedAccount
    console.log('Speaker updated:', updatedSpeaker);

    return res.status(200).json({
      message: 'Speaker removed successfully.',
      updatedSpeaker,
    });
  } catch (error) {
    console.error('Error removing speaker:', error.message);
    return res.status(500).json({ message: 'An error occurred while removing the speaker.' });
  }
});


// Route for fetching users by sharedAccountId
app.get('/api/users', authenticateJWT, async (req, res) => {
  try {
    const sharedAccountId = req.user.shared_account_id;

    if (!sharedAccountId) {
      return res.status(400).json({ message: 'Shared account ID is missing' });
    }

    const users = await UserModel.getUsersBySharedAccountId(sharedAccountId); // Changed to UserModel

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found for the shared account ID' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
});


// API-rutt för att hämta förfrågningar baserat på shared_account_id
app.get('/api/requests/:sharedAccountId', async (req, res) => {
  const { sharedAccountId } = req.params; // Capture sharedAccountId from URL
  console.log("sharedAccountId from URL:", sharedAccountId); // Should log correctly
  
  if (!sharedAccountId || isNaN(sharedAccountId)) {
    return res.status(400).json({ error: 'Ogiltigt eller saknat sharedAccountId' });
  }

  try {
    const requests = await UserModel.getRequestsBySharedAccount(sharedAccountId);
    
    if (requests.length === 0) {
      return res.status(404).json({ message: 'Inga förfrågningar hittades för det här kontot' });
    }

    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error.message);
    res.status(500).json({ error: 'Ett fel uppstod vid hämtning av förfrågningar' });
  }
});

// Approve request route
app.post('/api/approve-request', authenticateJWT, async (req, res) => {
  const { requestId, status } = req.body;

  try {
    // Kontrollera om requestId är giltig och tillhör det delade kontot
    const updatedRequest = await UserModel.approveRequest(requestId, status, req.user.shared_account_id);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ message: 'Error approving request' });
  }
});

// Reject request route
app.post(`/api/reject-request`, authenticateJWT, async (req, res) => {
  const { requestId, status } = req.body;

  try {
    // Call rejectRequest method from UserModel with the correct parameters
    const updatedRequest = await UserModel.rejectRequest(requestId, status, req.user.shared_account_id);  // Status '2' for rejected
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ message: 'Error rejecting request' });
  }
});
// Update request status route
app.post(`/api/update-request-status`, authenticateJWT, async (req, res) => {
  const { requestId, newStatus } = req.body;

  try {
    // Kontrollera att status är antingen "approved" eller "rejected"
    if (!['approved', 'rejected'].includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Uppdatera status i databasen via UserModel
    const updatedRequest = await UserModel.updateRequestStatus(
      requestId,
      newStatus,
      req.user.shared_account_id
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found or unauthorized' });
    }

    res.status(200).json({ message: 'Request status updated successfully', updatedRequest });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Error updating request status' });
  }
});

// POST route to handle password reset request
app.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    await UserModel.requestPasswordReset(email);
    return res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error('Error in /request-password-reset:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// // GET route for resetting the password
// app.get('/reset-password', async (req, res) => {
//   const { token } = req.query;

//   try {
//     const storedToken = await UserModel.validateToken(token);
//     if (!storedToken) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }
//     res.status(200).json({ message: 'Token is valid' });
//   } catch (error) {
//     console.error("Error validating token:", error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// // POST route to reset password
// app.post('/api/reset-password', async (req, res) => {
//   const { token, newPassword } = req.body;

//   if (!token || !newPassword) {
//     return res.status(400).json({ message: 'Invalid or missing data.' });
//   }

//   try {
//     // Validate the token and reset the password
//     const user = await UserModel.validateToken(token);
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token.' });
//     }

//     await UserModel.resetPassword(user.id, newPassword); // Reset password

//     res.status(200).json({ message: 'Password has been successfully reset.' });
//   } catch (err) {
//     console.error('Error during password reset:', err.message);
//     res.status(400).json({ message: err.message });
//   }
// });

// === Start server ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
