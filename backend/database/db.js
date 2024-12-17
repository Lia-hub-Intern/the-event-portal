const { Pool } = pkg;
import pkg from 'pg';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config(); // Read environment variables from .env file

// Create a connection pool to the database with the correct environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Default to port 5432 if not specified in .env
  });

  
// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  export default pool;