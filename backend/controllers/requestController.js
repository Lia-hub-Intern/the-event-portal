const UserModel = require('../Models/UserModel');  // Se till att importera rätt modell
const authenticateJWT = require('../middleware/authenticateJWT');  // Se till att importera JWT autentisering


// API-rutt för att hämta förfrågningar baserat på shared_account_id
const getRequests = async (req, res) => {
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

// Approve request route
const approveRequest = async (req, res) => {
  const { requestId, status } = req.body;

  try {
    const updatedRequest = await UserModel.approveRequest(requestId, status, req.user.shared_account_id);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ message: 'Error approving request' });
  }
};

// Reject request route
const rejectRequest = async (req, res) => {
  const { requestId, status } = req.body;

  try {
    const updatedRequest = await UserModel.rejectRequest(requestId, status, req.user.shared_account_id);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ message: 'Error rejecting request' });
  }
};

// Update request status route
const updateRequestStatus = async (req, res) => {
  const { requestId, newStatus } = req.body;

  try {
    if (!['approved', 'rejected'].includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedRequest = await UserModel.updateRequestStatus(
      requestId,
      newStatus,
      req.user.shared_account_id
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found or unauthorized' });
    }

    res.status(200).json({ message: 'Request status updated successfully', updatedRequest });
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ message: 'Error updating request status' });
  }
};

// POST route to handle password reset request
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    await UserModel.requestPasswordReset(email);
    return res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error('Error in /request-password-reset:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

// Export controller functions
module.exports = {
  getRequests,
  approveRequest,
  rejectRequest,
  updateRequestStatus,
  requestPasswordReset
};
