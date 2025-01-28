// Import necessary dependencies
import UserModel from '../models/UserModel.js'; // Assuming the path to UserModel is correct
import pool from '../database/db.js'; // Assuming the path to the database connection is correct
import { generateResetToken, } from '../middleware/authMiddleware.js ';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// === API Route to Get Requests by Shared Account ID ===
export const getRequests = async (req, res) => {
  const { sharedAccountId } = req.params;

  if (!sharedAccountId || isNaN(sharedAccountId)) {
    return res.status(400).json({ error: 'Ogiltigt eller saknat sharedAccountId' });
  }

  try {
    const requests = await UserModel.getRequestsBySharedAccount(sharedAccountId);

    if (requests.length === 0) {
      return res.status(404).json({ message: 'Inga förfrågningar hittades för det här kontot' });
    }

    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error.message);
    res.status(500).json({ error: 'Ett fel uppstod vid hämtning av förfrågningar' });
  }
};

// === Approve Request Route ===
export const approveRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    // Försök att godkänna förfrågan
    const updatedRequest = await UserModel.approveRequest(requestId, req.user.shared_account_id);

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Förfrågan hittades inte eller är otillåten' });
    }

    // Skicka bekräftelse till klienten
    res.status(200).json({
      message: 'Förfrågan har godkänts framgångsrikt och en bekräftelse har skickats till användaren.',
      updatedRequest,
    });
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ message: 'Fel vid godkännande av förfrågan' });
  }
};


// === Reject Request Route ===
export const rejectRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    // Försök att avvisa förfrågan
    const updatedRequest = await UserModel.rejectRequest(requestId, req.user.shared_account_id);

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Förfrågan hittades inte eller är otillåten' });
    }

    // Skicka bekräftelse till klienten
    res.status(200).json({
      message: 'Förfrågan har avvisats och en bekräftelse har skickats till användaren.',
      updatedRequest,
    });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ message: 'Fel vid avvisande av förfrågan' });
  }
};


// === POST Route: Update Request Status ===
export const updateRequestStatus = async (req, res) => {
  const { requestId, newStatus } = req.body;

  try {
    // Säkerställ att den nya statusen är godkänd eller avvisad
    if (!['approved', 'rejected'].includes(newStatus)) {
      return res.status(400).json({ message: 'Ogiltigt statusvärde' });
    }

    // Anropa modellen för att uppdatera status och skicka bekräftelsemail
    const updatedRequest = await UserModel.updateRequestStatus(
      requestId,
      newStatus,
      req.user.shared_account_id
    );

    res.status(200).json({
      message: `Förfrågan har ${newStatus === 'approved' ? 'godkänts' : 'avvisats'} och bekräftelse har skickats till användaren.`,
      updatedRequest,
    });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Fel vid uppdatering av status' });
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



