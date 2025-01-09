import express from 'express';
import { 
  getRequests, 
  approveRequest, 
  rejectRequest, 
  updateRequestStatus, 
  requestPasswordReset, 
  sendRequest
} from '../controllers/requestController.js'
import { registerUser, loginUser } from '../controllers/authController.js';
import speakerController from '../controllers/speakerController.js';
import { resetPassword, getUsersBySharedAccount } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

// Speaker routes
router.post('/api/add-speaker', authenticateJWT, speakerController.addSpeaker);
router.post('/api/remove-speaker', authenticateJWT, speakerController.removeSpeaker);
router.get('/api/getSpeakers', speakerController.getSpeakers);


// Request routes
router.get('/api/requests/:sharedAccountId', authenticateJWT, getRequests);
router.post('/api/requests/approve', authenticateJWT, approveRequest);
router.post('/api/requests/reject', authenticateJWT, rejectRequest);
router.post('/api/update-request-status', authenticateJWT, updateRequestStatus);
router.post('/api/requests', authenticateJWT, sendRequest);

// Authentication routes
router.post('/api/register', registerUser);
router.post('/api/login', loginUser);

// Password reset routes
router.post('/request-password-reset', requestPasswordReset);
router.route('/reset-password')
  .get(resetPassword)  // Display form
  .post(resetPassword); // Handle password change

// User routes
router.get('/api/users', authenticateJWT, getUsersBySharedAccount);

export default router;
