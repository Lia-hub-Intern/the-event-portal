import UserModel from '../models/UserModel.js'; // Assuming the path to UserModel is correct
import pool from '../database/db.js'; // Assuming the path to the database connection is correct
import { generateResetToken, } from '../middleware/authMiddleware.js '

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
    const updatedRequest = await UserModel.approveRequest(requestId, req.user.shared_account_id);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ message: 'Error approving request' });
  }
};

// === Reject Request Route ===
export const rejectRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const updatedRequest = await UserModel.rejectRequest(requestId, req.user.shared_account_id);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ message: 'Error rejecting request' });
  }
};

// === POST Route: Update Request Status ===
export const updateRequestStatus = async (req, res) => {
  const { requestId, newStatus } = req.body;

  try {
    // Ensure the new status is either 'approved' or 'rejected'
    if (!['approved', 'rejected'].includes(newStatus)) {
      return res.status(400).json({ message: 'Ogiltigt statusvärde' });
    }

    const updatedRequest = await UserModel.updateRequestStatus(
      requestId,
      newStatus,
      req.user.shared_account_id
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Förfrågningen hittades inte eller är otillåten' });
    }

    res.status(200).json({ message: 'Förfrågningens status har uppdaterats', updatedRequest });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Fel vid uppdatering av status' });
  }
};

// === POST Route: Send a new request ===
export const sendRequest = async (req, res) => {
  const { speakerId, eventDetails } = req.body;

  if (!speakerId || !eventDetails) {
    return res.status(400).json({ message: 'Missing information to create the request' });
  }

  try {
    // Försök att hämta speaker från databasen
    const speakerQuery = 'SELECT shared_account_id FROM users WHERE id = $1';
    const speakerResult = await pool.query(speakerQuery, [speakerId]);

    const speaker = speakerResult.rows[0];
    if (!speaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }

    const sharedAccountId = speaker.shared_account_id;

    console.log("Creating request with:", {
      speakerId,
      eventDetails,
      sharedAccountId,
      userId: req.user.userId, // User ID from the token
    });

    // Skapa ny förfrågan, här använder vi textvärdet "pending"
    const newRequest = await UserModel.createRequest(
      {
        speaker_id: speakerId,
        event_details: eventDetails,
        status: 'pending', // Använd textvärdet "pending"
        shared_account_id: sharedAccountId,
      },
      req.user.userId // Använd userId från JWT token
    );

    // Skicka svar till klienten
    res.status(201).json({ newRequest });
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
