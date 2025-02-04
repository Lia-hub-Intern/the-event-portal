import pool from '../database/db.js';
import dotenv from 'dotenv';

dotenv.config();

const InterestModel = {
  /**
   * Retrieve an interest by its type (e.g., "visitor", "stand", etc.)
   * @param {string} interestType - The type of interest to retrieve
   * @returns {Promise<object|null>} The interest object if found, or null if not found
   * @throws {Error} If the interest could not be retrieved
   */
  getInterestByType: async (interestType) => {
    const query = `
      SELECT * FROM interest
      WHERE LOWER(interest_type) = LOWER($1); -- Case-insensitive match
    `;

    const values = [interestType];

    try {
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error("Error retrieving interest: " + error.message);
    }
  },

  /**
   * Retrieve all available interests
   * @returns {Promise<object[]>} List of all interests
   * @throws {Error} If the interests could not be retrieved
   */
  getAllInterests: async () => {
    const query = `
      SELECT * FROM interest;
    `;

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error("Error retrieving interests: " + error.message);
    }
  },
};

export default InterestModel;