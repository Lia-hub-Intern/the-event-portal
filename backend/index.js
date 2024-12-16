const express = require('express');
const cors = require('cors');  // Importera cors
const app = express();
const userController = require('./controllers/userController'); // Importera userController
const requestController = require('./controllers/requestController'); // Importera din controller
const speakerController = require('./controllers/speakerController'); // Importera speakerController
const authenticateJWT = require('./middlewares/authenticateJWT'); // Importera din middleware


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
app.get('/api/requests/:sharedAccountId', requestController.getRequests);
app.post('/api/approve-request', authenticateJWT, requestController.approveRequest);  // Använd authenticateJWT här
app.post('/api/reject-request', authenticateJWT, requestController.rejectRequest);  // Använd authenticateJWT här
app.post('/api/update-request-status', authenticateJWT, requestController.updateRequestStatus);  // Använd authenticateJWT här
app.post('/request-password-reset', requestController.requestPasswordReset);
app.get('/api/users', authenticateJWT, userController.getUsersBySharedAccount); // Använd getUsersBySharedAccount från userController


// === Start server ===
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
