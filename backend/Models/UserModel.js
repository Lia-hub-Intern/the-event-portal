import pool from '../database/db.js';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();


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
  getUserRequests: async (userId) => {
    console.log("getUserRequests called with userId:", userId); // Log to check if function is being called

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
        r.speaker_id = $1;
    `;
  
    const values = [userId];
  
    try {
      const result = await pool.query(query, values);
      console.log("Query Result:", result.rows);  // Log result of query
  
      if (result.rows.length === 0) {
        console.log("No requests found for UserId:", userId);
        return [];  // Return empty array if no requests
      }
  
      return result.rows;  // Return the requests
    } catch (error) {
      console.error('Error in getUserRequests:', error.message);
      console.error('Query:', query);
      console.error('Values:', values);
      throw new Error('Failed to fetch requests by UserId');
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
      if (role === "speaker_agent" && !sharedAccountId) {
        console.log("Creating new shared account for role 'speaker_agent'...");
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


  // Funktion för att skicka återställningslänk via e-post
  sendResetEmail: async (email, resetToken, username) => {
    if (!email || !resetToken || !username) {
      console.log("Missing email, resetToken, or username:", { email, resetToken, username });  // Log the missing values
      throw new Error('Missing email, resetToken, or username.');
    }

    const resetLink = `http://localhost:5000/reset-password?token=${resetToken}&username=${username}`;

    console.log("Sending reset email with the following details: ", { email, resetToken, username });

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: 'Password Reset Request',
      text: `Please click the following link to reset your password: ${resetLink}`,
      html: `<p>Please click the following link to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
    };

    try {
      await sgMail.send(msg);  // Send email
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error during password reset email:', error.response ? error.response.body : error.message);
      throw new Error('Error during password reset email');
    }
  },



  requestPasswordReset: async (username, email) => {
    try {
      console.log("Reset password requested for:", username, email);  // Log input parameters

      // Validate both username and email are provided
      if (!username || !email) {
        throw new Error('Användarnamn och e-postadress krävs');
      }

      const query = `
      SELECT id, username, email 
      FROM users 
      WHERE username = $1 AND email = $2
    `;
      const result = await pool.query(query, [username.trim(), email.trim()]);

      if (result.rows.length === 0) {
        console.log("No matching user found.");
        throw new Error('Ingen användare hittades med angivet användarnamn och e-postadress.');
      }

      const user = result.rows[0];
      console.log("User found:", user);

      // Generate reset-token
      const resetToken = crypto.randomBytes(20).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      // Update the database with reset-token
      const updateQuery = `
      UPDATE users 
      SET reset_token = $1, reset_token_expires = $2 
      WHERE id = $3
    `;
      await pool.query(updateQuery, [resetToken, expiresAt, user.id]);

      // Log before sending email
      console.log("Sending reset email with:", user.email, resetToken, user.username); // Log values before email

      // Send reset link via email
      await sendResetEmail(user.email, resetToken, user.username); // Send both email and username

    } catch (error) {
      console.error("Error in requestPasswordReset:", error.message);
      throw error;
    }
  },


  resetPassword: async (token, username, newPassword) => {
    try {
      console.log('Validating token and username...');

      // Validera token och användarnamn
      const result = await pool.query(
        'SELECT id, reset_token, reset_token_expires FROM users WHERE reset_token = $1 AND username = $2',
        [token, username]
      );

      if (result.rows.length === 0) {
        throw new Error('Ogiltig eller utgången token, eller felaktigt användarnamn.');
      }

      const user = result.rows[0];
      console.log('User found:', user);

      const tokenExpirationDate = new Date(user.reset_token_expires);
      console.log('Token expiration date:', tokenExpirationDate);
      console.log('Current date:', new Date());

      if (new Date() > tokenExpirationDate) {
        throw new Error('Token har gått ut');
      }

      // Validera lösenord
      if (!newPassword || newPassword.length < 8) {
        throw new Error('Lösenordet måste vara minst 8 tecken långt');
      }

      // Hasha lösenordet
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Uppdatera lösenordet i databasen
      const updateQuery = `
      UPDATE users
      SET password = $1, reset_token = NULL, reset_token_expires = NULL
      WHERE id = $2
    `;
      await pool.query(updateQuery, [hashedPassword, user.id]);

      return { message: 'The password has been successfully reset!' };
    } catch (error) {
      console.error('Error in UserModel.resetPassword:', error.message);
      throw error;
    }
  },

/**
 * Hämta alla förfrågningar som skapats av en användare (baserat på användarens ID)
 * @param {number} userId - ID för den inloggade användaren
 * @returns {Promise<object[]>} Lista med förfrågningar
 */
getRequestsByUserId: async (userId) => {
  const query = `
    SELECT 
      r.id AS request_id,
      r.event_details,
      r.status,
      r.created_at
    FROM 
      public.requests r
    WHERE 
      r.user_id = $1;  -- Hämta förfrågningar där user_id matchar
  `;
  const values = [userId];

  try {
    console.log("Running query with userId:", userId); // Logga userId för felsökning
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log("No requests found for user ID:", userId);
      return []; // Returnera en tom lista om inga resultat hittas
    }

    console.log("Requests found:", result.rows); // Logga de hämtade förfrågningarna för insyn
    return result.rows;
  } catch (error) {
    console.error('Error in getRequestsByUserId:', error); // Logga hela felobjektet för detaljerad felsökning
    throw new Error('Failed to fetch requests by user ID'); // Specifik felmeddelande vid problem
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


// UserModel.js
 approveRequest: async (requestId, userId) => {
  const query = `
    SELECT id, status, shared_account_id, email, event_details, speaker_id
    FROM requests
    WHERE id = $1
  `;
  
  try {
    const result = await pool.query(query, [requestId]);

    if (result.rows.length === 0) {
      throw new Error('Request not found.');
    }

    const requestData = result.rows[0];

    // Kolla om användaren är talarbyrån eller talaren
    if (userId === requestData.shared_account_id || userId === requestData.speaker_id) {
      // Godkänn förfrågan genom att uppdatera statusen
      const updateQuery = `
        UPDATE requests
        SET status = 'approved'
        WHERE id = $1
        RETURNING id, status, shared_account_id, email, event_details
      `;
      
      const updateResult = await pool.query(updateQuery, [requestId]);

      const updatedRequest = updateResult.rows[0];

      // Skicka bekräftelse via e-post
      const { email, event_details } = updatedRequest;
      const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Request Approved',
        text: `Your request has been approved. Event details:\n\n${event_details}`,
        html: `<p>Your request has been approved. Event details:</p><p><strong>${event_details}</strong></p>`,
      };

      // Skicka e-post
      await sgMail.send(msg);
      console.log('Confirmation sent to:', email);

      return updatedRequest; // Returnerar den uppdaterade förfrågan
    } else {
      throw new Error('Unauthorized to approve this request');
    }
  } catch (err) {
    console.error('Error in approveRequest:', err.message);
    throw new Error('Failed to approve request');
  }
},


// UserModel.js
rejectRequest: async (requestId, userId) => {
  const query = `
    SELECT id, status, shared_account_id, email, event_details, speaker_id
    FROM requests
    WHERE id = $1
  `;

  try {
    const result = await pool.query(query, [requestId]);

    if (result.rows.length === 0) {
      throw new Error('Request not found.');
    }

    const requestData = result.rows[0];

    // Kontrollera om användaren är talarbyrån eller talaren
    if (userId === requestData.shared_account_id || userId === requestData.speaker_id) {
      const updateQuery = `
        UPDATE requests
        SET status = 'rejected'
        WHERE id = $1
        RETURNING id, status, shared_account_id, email, event_details
      `;

      const updateResult = await pool.query(updateQuery, [requestId]);

      const updatedRequest = updateResult.rows[0];

      // Skicka e-postbekräftelse
      const { email, event_details } = updatedRequest;
      const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Request Rejected',
        text: `Your request has been rejected. Event details:\n\n${event_details}`,
        html: `<p>Your request has been rejected. Event details:</p><p><strong>${event_details}</strong></p>`,
      };

      // Skicka e-post
      await sgMail.send(msg);
      console.log('Rejection email sent to:', email);

      return updatedRequest; // Returnerar den uppdaterade förfrågan
    } else {
      throw new Error('Unauthorized to reject this request');
    }
  } catch (err) {
    console.error('Error in rejectRequest:', err.message);
    throw new Error('Failed to reject request');
  }
},

// UserModel.js
updateRequestStatus: async (requestId, newStatus, userId) => {
  const requestQuery = `
    SELECT id, status, email, event_details, speaker_id, shared_account_id
    FROM requests
    WHERE id = $1
  `;

  const speakerQuery = `
    SELECT first_name, last_name
    FROM users
    WHERE id = $1;
  `;

  try {
    // Hämta förfrågan
    const requestResult = await pool.query(requestQuery, [requestId]);

    if (requestResult.rows.length === 0) {
      throw new Error('Request not found or unauthorized');
    }

    const updatedRequest = requestResult.rows[0];
    const { email, event_details, speaker_id, shared_account_id } = updatedRequest;

    // Logga information för felsökning
    console.log(`User ID from token: ${userId}, Shared Account ID: ${shared_account_id}, Speaker ID: ${speaker_id}`);

    // Kontrollera om användaren är auktoriserad att uppdatera status
    if (userId !== shared_account_id && userId !== speaker_id) {
      throw new Error('Unauthorized to update this request status');
    }

    // Hämta talarens namn
    const speakerResult = await pool.query(speakerQuery, [speaker_id]);

    if (speakerResult.rows.length === 0) {
      console.error('Speaker not found for ID:', speaker_id);
      throw new Error('Speaker not found');
    }

    const speaker = speakerResult.rows[0];
    const { first_name, last_name } = speaker;

    // Uppdatera förfrågans status
    const updateQuery = `
      UPDATE requests
      SET status = $1
      WHERE id = $2
      RETURNING id, status, email, event_details
    `;
    const updateValues = [newStatus, requestId];

    const updateResult = await pool.query(updateQuery, updateValues);

    if (updateResult.rows.length === 0) {
      throw new Error('Failed to update request status');
    }

    // Förbered e-postmeddelandet
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: `Request ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`,
      text: `Your request for speaker ${first_name} ${last_name} has been successfully ${newStatus}. Event details:\n\n${event_details}`,
      html: `<p>Your request for speaker <strong>${first_name} ${last_name}</strong> has been <strong>${newStatus === 'approved' ? 'Approved' : 'Rejected'}</strong>. Event details:</p><p><strong>${event_details}</strong></p>`,
    };

    // Skicka e-posten
    await sgMail.send(msg);
    console.log('Confirmation email sent to:', email);

    return updateResult.rows[0]; // Returnera den uppdaterade förfrågan
  } catch (err) {
    console.error('Error in updateRequestStatus:', err.message);
    throw new Error('Failed to update request status');
  }
},

  
  
// === Add a new request to the database ===
createRequest: async (requestData) => {
  const { speaker_id, event_details, status, shared_account_id, email } = requestData;

  // SQL query to get speaker's name and shared_account_id
  const speakerQuery = `
    SELECT first_name, last_name, shared_account_id
    FROM users
    WHERE id = $1;
  `;

  const values = [speaker_id];

  try {
    // Fetch speaker from the database
    const speakerResult = await pool.query(speakerQuery, values);
    const speaker = speakerResult.rows[0];
    
    if (!speaker) {
      console.error('Speaker not found for ID:', speaker_id);
      throw new Error('Speaker not found');
    }

    const { first_name, last_name, shared_account_id } = speaker;

    // Create the request in the database
    const query = `
      INSERT INTO requests (event_details, status, speaker_id, shared_account_id, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const requestValues = [event_details, status, speaker_id, shared_account_id, email];
    const result = await pool.query(query, requestValues);
    console.log('Request created:', result.rows[0]);

    // Send confirmation email after request is created
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL, // Sender's email from .env
      subject: 'Request Confirmation',
      text: `Your request for speaker ${first_name} ${last_name} has been successfully created. Event details:\n\n${event_details}`,
      html: `<p>Your request for speaker <strong>${first_name} ${last_name}</strong> has been successfully created. Event details:</p><p><strong>${event_details}</strong></p>`,
    };

    try {
      await sgMail.send(msg);
      console.log('Confirmation email sent to:', email);
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError.message);
      throw new Error('Error sending confirmation email: ' + emailError.message);
    }

    // Return the created request object.
    return result.rows[0];
  } catch (error) {
    console.error('Error creating the request:', error.message);
    throw new Error('Error creating the request: ' + error.message);
  }
},



  // Method to get all speakers
  getSpeakers: async () => {
    try {
      const query = `
      SELECT id, first_name, last_name, shared_account_id
      FROM users
      WHERE role = 'speaker'
    `;
      const result = await pool.query(query);
      return result.rows; // Returnera alla talare som JSON
    } catch (error) {
      console.error("Error fetching speakers from database:", error.message);
      throw new Error("Failed to fetch speakers");
    }
  },


  getUserById: async (userId) => {
    const query = `
      SELECT * 
      FROM users
      WHERE id = $1;
    `;
    const values = [userId];

    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return null; // No user found with the given ID
      }
      return result.rows[0]; // Return the user object
    } catch (err) {
      console.error('Error fetching user by ID:', err.message);
      throw new Error('Failed to fetch user by ID');
    }
  },

};

export default UserModel;
