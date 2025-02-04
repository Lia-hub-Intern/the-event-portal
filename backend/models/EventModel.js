import pool from '../database/db.js';
import dotenv from 'dotenv';

dotenv.config();

const EventModel = {
  /**
   * Check if an event exists by ID.
   * @param {number} event_id - The ID of the event
   * @returns {Promise<boolean>} True if the event exists, otherwise false
   */
  getEventById: async (event_id) => {
    const query = `
      SELECT id 
      FROM events 
      WHERE id = $1;
    `;

    try {
      const result = await pool.query(query, [event_id]);
      return result.rowCount > 0;
    } catch (error) {
      throw new Error("Error checking event existence: " + error.message);
    }
  },
};

export default EventModel;