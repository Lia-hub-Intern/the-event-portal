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
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Llama 3 API with Node.js and Express');
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});

export { pool };