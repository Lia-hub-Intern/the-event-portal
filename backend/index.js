import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes.js'; // Import routes.js
import { authenticateJWT } from './middleware/authMiddleware.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Protected route example
app.get('/protected-route', authenticateJWT, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: req.user });
});

app.get("/", (req, res) => {
  res.send("Server is running on 5000!");
});

// API URL endpoint
app.get('/api/config', (req, res) => {
  res.json({
    apiUrl: process.env.API_URL || 'http://localhost:5000',
  });
});

// Use the routes from routes.js
app.use(router);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});