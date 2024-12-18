import pool from '../database/db.js';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export const generateToken = (email) => {
  const payload = { email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const UserModel = {
    /**
   * Get a user by username
   * @param {string} username
   * @returns {Promise<object|null>} User data or null if not found
   */
    getUserByUsername: async (username) => {
      const query = `SELECT * FROM users WHERE username = $1`;
      const values = [username];
  
      try {
        const result = await pool.query(query, values);
        return result.rows[0] || null;
      } catch (err) {
        console.error('Error fetching user by username:', err);
        throw new Error('Failed to fetch user by username');
      }
  },
  

  /**
 * Create a new user in the database
 * @param {string} username
 * @param {string} hashedPassword
 * @param {string} role
 * @param {string} first_name
 * @param {string} last_name
 * @param {string} email
 * @param {number|null} sharedAccountId - The ID of the shared account (nullable)
 * @param {string|null} phone_number - The phone number of the user (nullable)
 * @param {string|null} company_name - The company name of the user (nullable)
 * @returns {Promise<object>} Newly created user
 */
createUser: async (username, hashedPassword, role, first_name, last_name, email, sharedAccountId = null, phone_number = null, company_name = null) => {
  try {
    // Validate password length (at least 8 characters)
    if (hashedPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Validate email format (simple regex for email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Check if the username already exists
    const existingUserByUsername = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUserByUsername.rows.length > 0) {
      throw new Error('Username already exists');
    }

    // If the role is "user_account" and no sharedAccountId is provided, create a new shared account
    if (role === "user_account" && !sharedAccountId) {
      console.log("Creating new shared account for role 'user_account'...");
      const createSharedAccountQuery = `
        INSERT INTO shared_accounts DEFAULT VALUES RETURNING id
      `;

      const sharedAccountResult = await pool.query(createSharedAccountQuery);
      sharedAccountId = sharedAccountResult.rows[0]?.id;

      if (!sharedAccountId) {
        throw new Error("Failed to retrieve shared_account_id after creation.");
      }
      console.log("New shared_account_id created:", sharedAccountId);
    }

    // Validate that the sharedAccountId exists (if it's not null)
    if (sharedAccountId) {
      const sharedAccountCheck = await pool.query('SELECT * FROM shared_accounts WHERE id = $1', [sharedAccountId]);
      if (sharedAccountCheck.rows.length === 0) {
        throw new Error(`Shared account with ID ${sharedAccountId} does not exist.`);
      }
    }

    // Create the user in the database without reset_token and reset_token_expires
    const query = `
      INSERT INTO users (username, password, role, first_name, last_name, email, shared_account_id, phone_number, company_name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, username, role, first_name, last_name, email, shared_account_id, phone_number, company_name
    `;
    const values = [
      username, 
      hashedPassword, 
      role, 
      first_name, 
      last_name, 
      email, 
      sharedAccountId, 
      phone_number, 
      company_name
    ];

    const result = await pool.query(query, values);
    console.log("User successfully created:", result.rows[0]);
    return result.rows[0];

  } catch (err) {
    console.error("Error in createUser:", err.message);
    throw new Error(err.message || "Failed to create user.");
  }
},

  

/**
 * Hämta alla förfrågningar för ett specifikt delat konto
 * @param {number} sharedAccountId - ID för det delade kontot
 * @returns {Promise<object[]>} Lista med förfrågningar
 */
getRequestsBySharedAccount: async (sharedAccountId) => {
  const query = `
    SELECT 
      r.id AS request_id,
      r.event_details,
      r.status,
      u.first_name AS speaker_first_name,
      u.last_name AS speaker_last_name,
      r.created_at
    FROM 
      public.requests r
    JOIN 
      users u ON r.speaker_id = u.id
    WHERE 
      r.shared_account_id = $1;
  `;
  const values = [sharedAccountId];

  try {
    console.log("Running query with sharedAccountId:", sharedAccountId); // Logga värdet för sharedAccountId
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log("No requests found for shared account ID:", sharedAccountId);
      return []; // Returnera en tom lista om inga resultat hittas
    }

    return result.rows;
  } catch (error) {
    console.error('Error in getRequestsBySharedAccount:', error.message);
    throw new Error('Failed to fetch requests by shared account ID');
  }
},


/**
   * Fetch users by shared account ID
   * @param {number} sharedAccountId - The ID of the shared account
   * @returns {Promise<Array>} List of users
   */
getUsersBySharedAccountId: async (sharedAccountId) => {
  try {
    const query = `
      SELECT * FROM users WHERE shared_account_id = $1
    `;
    const result = await pool.query(query, [sharedAccountId]);
    return result.rows; // Return the list of users
  } catch (error) {
    console.error('Error in getUsersBySharedAccountId:', error.message);
    throw new Error('Failed to fetch users by shared account ID');
  }
},


/**
 * Add a user to a shared account
 * @param {number} adminId - The user account ID
 * @param {string} username
 * @param {string} hashedPassword
 * @param {string} first_name
 * @param {string} last_name
 * @returns {Promise<object>} Newly added user
 */
addUserToSharedAccount: async (adminId, username, hashedPassword, first_name, last_name) => {
  console.log(`Attempting to add user to shared account. Admin ID: ${adminId}, Username: ${username}`);
  
  const admin = await userModel.getUserById(adminId);
  
  if (!admin) {
    console.error('Admin not found');
    throw new Error('Admin not found');
  }

  if (admin.role !== 'user_account') {
    console.error('Only users with role "user_account" can add speakers to shared accounts.');
    throw new Error('Only users with role "user_account" can add speakers to shared accounts.');
  }

  let sharedAccountId = admin.shared_account_id;
  
  if (!sharedAccountId) {
    console.log('No shared account found for this admin. Creating a new shared account.');
    const sharedAccount = await userModel.createSharedAccount();
    sharedAccountId = sharedAccount.id;
    await userModel.updateUserSharedAccountId(adminId, sharedAccountId);
    console.log(`New shared account created with ID: ${sharedAccountId}`);
  }

  console.log(`Creating speaker with username: ${username} and shared account ID: ${sharedAccountId}`);
  
  const newUser = await userModel.createUser(username, hashedPassword, 'speaker', first_name, last_name, sharedAccountId);
  
  console.log(`Speaker ${username} added to shared account ${sharedAccountId}.`);
  
  return newUser;
},
/**
 * Remove a user from a shared account by setting the shared_account_id to null.
 * @param {number} userId - The ID of the user to remove from the shared account.
 * @returns {Promise<object>} The updated user record.
 */
removeUserFromSharedAccount: async (userId) => {
  try {
    const query = `
      UPDATE users
      SET shared_account_id = NULL
      WHERE id = $1
      RETURNING id, username, shared_account_id
    `;
    const values = [userId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error('User not found or already removed from shared account.');
    }

    console.log('User successfully removed from shared account:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Error removing user from shared account:', err.message);
    throw new Error(err.message || 'Failed to remove user from shared account.');
  }
},




  /**
   * Get all users linked to a shared account.
   * @param {number} sharedAccountId
   * @returns {Promise<object[]>} Users list
   */
  getUsersBySharedAccount: async (sharedAccountId) => {
    const query = `SELECT * FROM users WHERE shared_account_id = $1`;
    const values = [sharedAccountId];

    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      console.error('Error fetching users by shared account:', err.message);
      throw new Error('Failed to fetch shared account users');
    }
  },

  // Function to send password reset email
  sendResetEmail: async (email, resetToken) => {
    const resetLink = `http://localhost:5000/reset-password?token=${resetToken}`;
  
    const msg = {
      to: email,
      from: {
        email: process.env.SENDER_EMAIL,
      },
      subject: 'Password Reset Request',
      text: `Please click the following link to reset your password: ${resetLink}`,
    };
  
    try {
      await sgMail.send(msg);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error during password reset email:', error.response ? error.response.body : error.message);
      throw new Error('Error during password reset email');
    }
  },

  // Funktion för att hantera lösenordsåterställning
  requestPasswordReset: async (email) => {
    try {
      // Kontrollera om användaren finns
      const query = 'SELECT id, email FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);

      if (result.rows.length === 0) {
        throw new Error('Ingen användare med denna e-postadress hittades.');
      }

      const user = result.rows[0];

      // Generera reset-token och utgångstid
      const resetToken = crypto.randomBytes(20).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000); // 1 timme framåt

      // Uppdatera databasen
      const updateQuery = `
        UPDATE users 
        SET reset_token = $1, reset_token_expires = $2 
        WHERE id = $3
      `;
      await pool.query(updateQuery, [resetToken, expiresAt, user.id]);

      // Skicka återställningslänk via e-post
      await UserModel.sendResetEmail(user.email, resetToken);
    } catch (error) {
      console.error('Error in UserModel.requestPasswordReset:', error.message);
      throw error;
    }
  },



validateToken: async (token) => {
  try {
    console.log('Validating token:', token);

    // Query the database for the token
    const result = await pool.query(
      'SELECT id, reset_token, reset_token_expires FROM users WHERE reset_token = $1',
      [token]
    );

    if (result.rows.length === 0) {
      console.log('Token not found or expired.');
      throw new Error('Invalid or expired token');
    }

    const user = result.rows[0];
    const tokenExpirationDate = new Date(user.reset_token_expires);

    // Check if the token is expired
    if (new Date() > tokenExpirationDate) {
      console.log('Token has expired');
      throw new Error('Token has expired');
    }

    // Convert to local time (e.g., Stockholm time)
    const localExpirationTime = tokenExpirationDate.toLocaleTimeString('sv-SE', {
      timeZone: 'Europe/Stockholm',
      hour: '2-digit',
      minute: '2-digit',
    });

    console.log('Token expiration time in local timezone:', localExpirationTime);

    // Send the local expiration time back to the frontend
    return { user, localExpirationTime };
  } catch (err) {
    console.error('Error during token validation:', err.message);
    throw new Error(`Error during token validation: ${err.message}`);
  }
},


resetPassword: async (userId, newPassword) => {
  try {
    if (!newPassword || newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('Hashed password:', hashedPassword);

    // Update password in the database
    const result = await pool.query(
      'UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2 AND reset_token IS NOT NULL RETURNING id',
      [hashedPassword, userId]
    );

    // Check if the user was updated
    if (result.rowCount === 0) {
      console.log('No user found with the given ID or the reset token was already cleared');
      throw new Error('User not found or invalid ID');
    }

    console.log('Password updated for user ID:', userId);
    return { message: 'Password reset successfully' };
  } catch (err) {
    console.error('Error during password reset:', err.message);
    throw new Error('Error during password reset');
  }
},



  /**
   * Update the user's shared_account_id
   * @param {number} userId - User's ID
   * @param {number} sharedAccountId - The shared account ID to associate with the user
   * @returns {Promise<object>} Updated user data
   */
  updateUserSharedAccountId: async (userId, sharedAccountId) => {
    const query = `
      UPDATE users
      SET shared_account_id = $1
      WHERE id = $2
      RETURNING id, username, shared_account_id
    `;
    const values = [sharedAccountId, userId];

    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        console.error(`No user found with ID ${userId}`);
        throw new Error(`No user found with ID ${userId}`);
      }
      return result.rows[0];
    } catch (err) {
      console.error('Error updating shared_account_id:', err.message);
      throw new Error('Failed to update shared_account_id');
    }
  },

  /**
   * Create a shared account and return its ID.
   * @returns {Promise<object>} Newly created shared account with ID
   */
  createSharedAccount: async () => {
    const query = `INSERT INTO shared_accounts DEFAULT VALUES RETURNING id`;
    try {
      const result = await pool.query(query);
      return result.rows[0]; // Return the new shared account's ID
    } catch (err) {
      console.error('Error creating shared account:', err);
      throw new Error('Failed to create shared account');
    }
  },


/**
 * Approve a request by updating its status to 'approved'
 * @param {number} requestId - The ID of the request to approve
 * @param {number} sharedAccountId - The ID of the shared account linked to the request
 * @returns {Promise<object>} The updated request data
 */
approveRequest: async (requestId, sharedAccountId) => {
  const query = `
    UPDATE requests
    SET status = 'approved'
    WHERE id = $1 AND shared_account_id = $2
    RETURNING id, status, shared_account_id
  `;
  const values = [requestId, sharedAccountId];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Request not found or already approved.');
    }
    return result.rows[0]; // Return updated request
  } catch (err) {
    console.error("Error in approveRequest:", err.message);
    throw new Error('Failed to approve request');
  }
},

/**
 * Reject a request by updating its status to 'rejected'
 * @param {number} requestId - The ID of the request to reject
 * @param {number} sharedAccountId - The ID of the shared account linked to the request
 * @returns {Promise<object>} The updated request data
 */
rejectRequest: async (requestId, sharedAccountId) => {
  const query = `
    UPDATE requests
    SET status = 'rejected'
    WHERE id = $1 AND shared_account_id = $2 
    RETURNING id, status, shared_account_id
  `;
  const values = [requestId, sharedAccountId];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return updated request
  } catch (err) {
    console.error("Error in rejectRequest:", err.message);
    throw new Error('Failed to reject request');
  }
},
/**
 * Uppdatera status för en förfrågan
 * @param {number} requestId - ID för förfrågan
 * @param {string} newStatus - Ny status (approved/rejected)
 * @param {number} sharedAccountId - ID för delat konto
 * @returns {Promise<object>} Uppdaterad förfrågan
 */
updateRequestStatus: async (requestId, newStatus, sharedAccountId) => {
  const query = `
    UPDATE requests
    SET status = $1
    WHERE id = $2 AND shared_account_id = $3
    RETURNING id, status, shared_account_id
  `;
  const values = [newStatus, requestId, sharedAccountId];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Request not found or unauthorized');
    }
    return result.rows[0]; // Returnera uppdaterad förfrågan
  } catch (err) {
    console.error("Error in updateRequestStatus:", err.message);
    throw new Error('Failed to update request status');
  }
},



};

export default UserModel;
