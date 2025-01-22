import express from 'express';
import { getEvents } from '../Controller/getEvents.js';
import { callEvents } from '../Controller/callEvents.js';
import { bulkPitch } from '../Controller/bulkPitch.js';

const router = express.Router();

// Route to get events
router.get('/api/events', getEvents);

// Route to generate events
router.post('/generate', (req, res) => {
  callEvents(req, res);
});

// Route to handle bulk pitch submissions
router.post('/api/bulk-pitch', (req, res) => {
  bulkPitch(req, res);
});

export default router;
