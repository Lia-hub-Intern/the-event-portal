import pool from '../database/db.js';
import dotenv from 'dotenv';

dotenv.config();

const EventRegistrationModel = {
  /**
   * Create a new registration for a user in an event with a specific interest
   * @param {object} registrationData - The registration data
   * @param {number} registrationData.user_id - The ID of the user
   * @param {number} registrationData.event_id - The ID of the event
   * @param {number} registrationData.interest - The ID of the interest type
   * @returns {Promise<object>} The newly created registration
   * @throws {Error} If the registration could not be created
   */
  createRegistration: async ({ user_id, event_id, interest }) => {
    const query = `
      INSERT INTO user_event_interest (user_id, event_id, interest_id)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, event_id, interest_id) DO NOTHING
      RETURNING *;
    `;

    const values = [user_id, event_id, interest];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error creating registration: " + error.message);
    }
  },

  /**
   * Check if a specific registration exists
   * @param {object} registrationData - The registration data
   * @param {number} registrationData.user_id - The ID of the user
   * @param {number} registrationData.event_id - The ID of the event
   * @param {number} registrationData.interest_id - The ID of the interest
   * @returns {Promise<object|null>} The registration if it exists, or null if it doesn't
   * @throws {Error} If there is an issue querying the database
   */
  getRegistration: async ({ user_id, event_id, interest_id }) => {
    const query = `
      SELECT * 
      FROM user_event_interest
      WHERE user_id = $1 AND event_id = $2 AND interest_id = $3;
    `;

    const values = [user_id, event_id, interest_id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0] || null; // Return the registration if found, otherwise null
    } catch (error) {
      throw new Error("Error checking registration: " + error.message);
    }
  },

  /**
   * Retrieve all registrations for a specific user and event
   * @param {number} user_id - The ID of the user
   * @param {number} event_id - The ID of the event
   * @returns {Promise<object[]>} List of interests registered by the user for the event
   * @throws {Error} If the registrations could not be retrieved
   */
  getRegistrationsByEventAndUser: async (user_id, event_id) => {
    const query = `
      SELECT i.interest_type
      FROM user_event_interest uei
      JOIN interest i ON uei.interest_id = i.id
      WHERE uei.user_id = $1 AND uei.event_id = $2;
    `;

    const values = [user_id, event_id];

    try {
      if (!user_id || !event_id) {
        throw new Error("Missing user_id or event_id.");
      }

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        console.warn(`No registrations found for user_id: ${user_id}, event_id: ${event_id}`);
      }

      return result.rows;
    } catch (error) {
      if (error.message.includes("missing FROM-clause entry")) {
        throw new Error("Invalid table or column name in query.");
      }
      throw new Error("Error retrieving registrations: " + error.message);
    }
  },

  /**
   * Delete all registrations for a specific event
   * @param {number} event_id - The ID of the event to delete registrations for
   * @returns {Promise<number>} The number of registrations deleted
   * @throws {Error} If the registrations could not be deleted
   */
  deleteAllRegistrationsForEvent: async (event_id) => {
    const query = `
        DELETE FROM user_event_interest
        WHERE event_id = $1
        RETURNING *;
      `;

    const values = [Number(event_id)]; // Ensure event_id is treated as a number

    try {
      if (!event_id) {
        throw new Error("Event ID is required to delete registrations.");
      }

      console.log('Query:', query); // Debug log
      console.log('Values:', values); // Debug log

      const result = await pool.query(query, values);
      return result.rowCount; // Returns the number of deleted rows
    } catch (error) {
      throw new Error("Error deleting registrations for event: " + error.message);
    }
  },

  /**
 * Delete a registration for a specific user, event, and interest
 * @param {object} registrationData - The registration data to delete
 * @param {number} registrationData.user_id - The ID of the user
 * @param {number} registrationData.event_id - The ID of the event
 * @param {number} registrationData.interest_id - The ID of the interest type
 * @returns {Promise<boolean>} True if the registration was deleted, false otherwise
 * @throws {Error} If the registration could not be deleted
 */
  deleteSpecificRegistrationForEvent: async ({ user_id, event_id, interest_id }) => {
    const query = `
      DELETE FROM user_event_interest
      WHERE user_id = $1 AND event_id = $2 AND interest_id = $3
      RETURNING user_id, event_id, interest_id,
                (SELECT interest_type FROM interest WHERE id = $3) AS interest_type;
    `;

    const values = [user_id, event_id, interest_id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the deleted row with additional details
    } catch (error) {
      throw new Error("Error deleting registration: " + error.message);
    }
  },

  /**
  * Update interest types for a specific user and event
  * @param {object} registrationData - The data required to update interests
  * @param {number} registrationData.user_id - The ID of the user
  * @param {number} registrationData.event_id - The ID of the event
  * @param {number[]} registrationData.new_interest_ids - An array of new interest IDs to be updated
  * @returns {Promise<object>} The updated registration data including current and removed interests
  * @throws {Error} If the update could not be performed
  */
  updateEventInterests: async ({ user_id, event_id, new_interest_ids }) => {
    try {
      // Step 1: Fetch current interests
      const currentInterestsQuery = `
        SELECT uei.interest_id, i.interest_type
        FROM user_event_interest uei
        JOIN interest i ON uei.interest_id = i.id
        WHERE uei.user_id = $1 AND uei.event_id = $2;
      `;
      const currentInterestsResult = await pool.query(currentInterestsQuery, [user_id, event_id]);
      const currentInterests = currentInterestsResult.rows;

      // Step 2: Determine interests to add and remove
      const currentInterestIds = currentInterests.map(row => row.interest_id);
      const toAdd = new_interest_ids.filter(id => !currentInterestIds.includes(id));
      const toRemove = currentInterestIds.filter(id => !new_interest_ids.includes(id));

      // Step 3: Remove interests no longer selected
      let removedInterests = [];
      if (toRemove.length > 0) {
        const removeQuery = `
          DELETE FROM user_event_interest
          WHERE user_id = $1 AND event_id = $2 AND interest_id = ANY($3::int[])
          RETURNING interest_id;
        `;
        const removeResult = await pool.query(removeQuery, [user_id, event_id, toRemove]);
        const removedIds = removeResult.rows.map(row => row.interest_id);

        // Fetch interest types for removed IDs
        const removedInterestsQuery = `
          SELECT id AS interest_id, interest_type
          FROM interest
          WHERE id = ANY($1::int[]);
        `;
        const removedInterestsResult = await pool.query(removedInterestsQuery, [removedIds]);
        removedInterests = removedInterestsResult.rows;
      }

      // Step 4: Add newly selected interests
      if (toAdd.length > 0) {
        const addQuery = `
          INSERT INTO user_event_interest (user_id, event_id, interest_id)
          SELECT $1, $2, unnest($3::int[])
          ON CONFLICT DO NOTHING;
        `;
        await pool.query(addQuery, [user_id, event_id, toAdd]);
      }

      // Step 5: Fetch updated interests
      const updatedInterestsResult = await pool.query(currentInterestsQuery, [user_id, event_id]);
      const updatedInterests = updatedInterestsResult.rows;

      // Step 6: Combine and return the results
      return {
        message: "Interests updated successfully.",
        currentInterests: updatedInterests, // All current interests after update
        removedInterests: removedInterests, // Interest(s) removed during the update
      };
    } catch (error) {
      throw new Error("Error updating interests: " + error.message);
    }
  }
};

export default EventRegistrationModel;
