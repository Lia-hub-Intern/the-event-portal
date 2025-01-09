// backend/Controller/getEvents.js

import pool from '../db.js';

export const getEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.status(200).json({ events: result.rows });
  } catch (error) {
    console.error('Error fetching events from database:', error);
    res.status(500).send('Internal Server Error');
  }
};