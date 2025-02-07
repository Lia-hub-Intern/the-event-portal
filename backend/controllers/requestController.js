// Import necessary dependencies
import UserModel from '../models/UserModel.js'; // Assuming the path to UserModel is correct
import pool from '../database/db.js'; // Assuming the path to the database connection is correct
import { generateResetToken, } from '../middleware/authMiddleware.js ';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Assuming you're using the authentication middleware to decode the JWT token
export const fetchUserRequests = async (req, res) => {
  try {
    const userId = req.user.userId;  // Access the userId from the authenticated request
    console.log("Decoded user ID:", userId);


    // Check for any issues with the user ID
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing." });
    }

    // Fetch requests for the user from your model/database
    const requests = await UserModel.getUserRequests(userId);

    // If no requests are found, you might want to return an empty array or a message
    if (!requests) {
      return res.status(404).json({ message: "No requests found for this user." });
    }

    // Send the fetched requests as a response
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);

    // Return a 500 error if there was an issue with fetching the requests
    res.status(500).json({ message: "Error fetching requests.", error: err.message });
  }
};




// === API Route to Get Requests by Shared Account ID ===
export const getRequests = async (req, res) => {
  const { sharedAccountId } = req.params;

  if (!sharedAccountId || isNaN(sharedAccountId)) {
    return res.status(400).json({ error: 'Invalid or missing sharedAccountId' });
  }

  try {
    const requests = await UserModel.getRequestsBySharedAccount(sharedAccountId);

    if (requests.length === 0) {
      return res.status(404).json({ message: 'No requests found for this account' });
    }

    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching the requests' });
  }
};


// === Approve Request Route ===
export const approveRequest = async (req, res) => {
  const { requestId } = req.body;
  const userId = req.user.id;  // Vi hämtar ID:t från den inloggade användaren

  try {
    const updatedRequest = await UserModel.approveRequest(requestId, userId);

    res.status(200).json({
      message: 'Request has been successfully approved.',
      updatedRequest,
    });
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ message: 'Error approving the request' });
  }
};


// Reject Request Route
export const rejectRequest = async (req, res) => {
  const { requestId } = req.body;
  const userId = req.user.id;  // Hämta den inloggade användarens ID

  try {
    const updatedRequest = await UserModel.rejectRequest(requestId, userId);
    res.status(200).json({
      message: 'Request has been successfully rejected.',
      updatedRequest,
    });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ message: 'Error rejecting the request' });
  }
};

// === POST Route: Update Request Status ===
export const updateRequestStatus = async (req, res) => {
  const { requestId, newStatus } = req.body;
  const userId = req.user.userId; // Hämta userId från token

  try {
    // Kontrollera att den nya statusen är giltig
    if (!['approved', 'rejected'].includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Anropa modellen för att uppdatera statusen och skicka bekräftelsemail
    const updatedRequest = await UserModel.updateRequestStatus(requestId, newStatus, userId);

    res.status(200).json({
      message: `The request has been ${newStatus === 'approved' ? 'approved' : 'rejected'}, and a confirmation has been sent to the user.`,
      updatedRequest,
    });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Error updating status' });
  }
};



// === POST Route: Send a new request ===
export const sendRequest = async (req, res) => {
  const { speakerId, eventDetails, email } = req.body;

  // Ensure all required fields are provided
  if (!speakerId || !eventDetails || !email) {
    return res.status(400).json({ message: 'Missing information to create the request' });
  }

  try {
    // Fetch the speaker from the database (if needed for further use, e.g., first and last name)
    const speakerQuery = 'SELECT first_name, last_name, shared_account_id FROM users WHERE id = $1';
    const speakerResult = await pool.query(speakerQuery, [speakerId]);

    const speaker = speakerResult.rows[0];
    if (!speaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }

    const { shared_account_id } = speaker;

    // Call the userModel's createRequest function to create the request and send the email
    const newRequest = await UserModel.createRequest({
      speaker_id: speakerId,
      event_details: eventDetails,
      status: 'pending',  // Assuming status is set to 'pending' by default
      shared_account_id: shared_account_id,
      email,
    });

    // Return the new request details as a response
    res.status(201).json({
      message: 'Request created successfully',
      newRequest,
    });

  } catch (error) {
    console.error('Error creating the request:', error);
    res.status(500).json({ message: 'Error creating the request' });
  }
};

// Function for requesting password reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email, username } = req.body;

    // Log the incoming request to see what is being received
    console.log('Received email:', email);
    console.log('Received username:', username);

    // Query the user based on email and username, including the email field
    const userResult = await pool.query('SELECT id, username, email FROM users WHERE email = $1 AND username = $2', [email, username]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the user object to verify email field
    console.log("User object:", user);

    // Generate reset token
    const resetToken = generateResetToken(user.email, user.id);

    // Log the token for debugging
    console.log('Generated resetToken:', resetToken);

    // Store the token and expiration time in the database
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour expiration
    await pool.query('UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE id = $3', [resetToken, expiresAt, user.id]);

    // Log the details before sending the reset email
    console.log("Sending reset email with:", { email: user.email, resetToken, username: user.username });

    // Send reset email
    await UserModel.sendResetEmail(user.email, resetToken, user.username);

    // Send a successful response
    return res.status(200).json({ message: 'Password reset link sent! Please check your email.' });
  } catch (error) {
    console.error('Error during password reset:', error.message);
    return res.status(500).json({ message: 'Failed to process the request' });
  }
};
