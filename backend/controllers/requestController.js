// Import necessary dependencies
import UserModel from '../Models/UserModel.js'; // Assuming the path to UserModel is correct

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

// === POST Route: Request Password Reset ===
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'E-postadress krävs.' });
  }

  try {
    await UserModel.requestPasswordReset(email);
    return res.status(200).json({ message: 'Lösenordsåterställnings-e-post har skickats.' });
  } catch (error) {
    console.error('Error in /request-password-reset:', error.message);
    return res.status(500).json({ error: 'Internt serverfel.' });
  }
};

// Export default
export default { getRequests, approveRequest, rejectRequest, updateRequestStatus, requestPasswordReset };
