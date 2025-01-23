<<<<<<< HEAD
/**---------------------------------------------------------
* Developer Full Stack: Darwin Rengifo
*
* Create Date: 2024-08-14
*     Program : Stagefinder Index
*   Path Name : stagefinder/index.js
*       Tools : Javascript, NodeJs, Express, dotenv, nodemon
*
* Description:
* - create express server.
* - Cross-Origin Resource Sharing(CORS).
*   Allows requests from domain-B to domain-A
*   if domain-B is not configured, you will get a
*   error for violation of CORS policy
* - process.env.PORT || 8000.
*   When the project is uploaded to the server,
*   the server looks for an available port, if it
*   does not find one, it assigns port 7000
*-----------------------------------------------------------*/
import express from "express"
import dotenv from "dotenv"
import routes from "./routes/routes.js"
import cors from "cors"
//import path from 'path';
//import { fileURLToPath } from 'url';


dotenv.config()

const app = express();
const PORT = process.env.PORT

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin === "http://localhost:5173") {
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    } else if (origin === "http://127.0.0.1:5173") {
        res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    }
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
/*const corsOptions = {
    origin: "http://localhost:5173",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}*/

app.use(express.json());
app.use(routes)
//app.use(cors())
//app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Llama 3 API with Node.js and Express');
});

app.listen(PORT, () =>
    console.log(`The server is running on port:${PORT}`)
)
=======
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
>>>>>>> Requestform/Heba
