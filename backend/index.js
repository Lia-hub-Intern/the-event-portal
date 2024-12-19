import express from 'express';
import cors from 'cors'; // Importera cors
import { getRequests, approveRequest, rejectRequest, updateRequestStatus, requestPasswordReset} from './controllers/requestController.js'; // Adjust path to your controller file
import { registerUser, loginUser } from './controllers/authController.js'; // Import the correct path to your controller file
import speakerController from './controllers/speakerController.js'; // Importera speakerController
import  { resetPassword, getUsersBySharedAccount } from './controllers/userController.js'; // Import your controller
import dotenv from 'dotenv'; // Importera dotenv för att hantera miljövariabler
import { authenticateJWT, generateToken } from './middleware/authMiddleware.js';

const app = express();

app.use(express.urlencoded({ extended: true })); // För att hantera formulärdat

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', // Allow frontend requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Expand allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow cookies and authorization headers
}));

// Skyddad rutt som kräver autentisering
app.get('/protected-route', authenticateJWT, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
});

app.use(express.json()); // Parse JSON payloads

// API URL endpoint
app.get('/api/config', (req, res) => {
  res.json({
    apiUrl: process.env.API_URL || 'http://localhost:5000', // API_URL from .env or default
  });
});


// API-rutter
app.post('/api/add-speaker', authenticateJWT, speakerController.addSpeaker); // Använd addSpeaker-metoden från speakerController
app.post('/api/remove-speaker', authenticateJWT, speakerController.removeSpeaker); // Använd removeSpeaker-metoden från speakerController
app.get('/api/requests/:sharedAccountId', authenticateJWT, getRequests);
app.post('/api/requests/approve', authenticateJWT, approveRequest);
app.post('/api/requests/reject', authenticateJWT, rejectRequest);
app.post('/api/update-request-status', authenticateJWT, updateRequestStatus);
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/request-password-reset', requestPasswordReset); // Lägg till rätt POST-rutt här
app.route('/reset-password')
  .get(resetPassword)  // Visa formulär
  .post(resetPassword); // Hantera lösenordsändring
app.get('/api/users', authenticateJWT,getUsersBySharedAccount); // Använd getUsersBySharedAccount från userController


// === Start server ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
