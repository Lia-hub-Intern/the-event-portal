import express from 'express';
import {
  getRequests,
  approveRequest,
  rejectRequest,
  updateRequestStatus,
  requestPasswordReset
} from '../controllers/requestController.js'
import { registerUser, loginUser } from '../controllers/authController.js';
import speakerController from '../controllers/speakerController.js';
import { resetPassword, getUsersBySharedAccount } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import EventRegistrationController from '../controllers/eventRegistrationController.js';
const router = express.Router();

// Speaker routes
router.post('/api/add-speaker', authenticateJWT, speakerController.addSpeaker);
router.post('/api/remove-speaker', authenticateJWT, speakerController.removeSpeaker);
router.get('/api/BeASpeaker', authenticateJWT, (req, res) => {
  res.json({ message: 'Welcome to the Be A Speaker page!' });
});

// Request routes
router.get('/api/requests/:sharedAccountId', authenticateJWT, getRequests);
router.post('/api/requests/approve', authenticateJWT, approveRequest);
router.post('/api/requests/reject', authenticateJWT, rejectRequest);
router.post('/api/update-request-status', authenticateJWT, updateRequestStatus);

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

// Event Registration routes 
//router.post('/api/event-registration/register', authenticateJWT, EventRegistrationController.registerInterest);
//router.get('/api/event-registration/:user_id/:event_id', authenticateJWT, EventRegistrationController.getRegistrations);
//router.delete("/delete", authenticateJWT, EventRegistrationController.deleteRegistration);
//router.put("/update", authenticateJWT, EventRegistrationController.updateRegistration);


// Event Registration routes (for simplicity ot testing)
router.post('/api/event-registration/register', EventRegistrationController.registerInterest);
router.get('/api/event-registration/:user_id/:event_id', EventRegistrationController.getRegistrations);

//router.delete("/delete", EventRegistrationController.deleteRegistration);
//router.put("/update", EventRegistrationController.updateRegistration);

export default router;
