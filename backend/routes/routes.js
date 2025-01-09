import express from 'express';
import { getEvents } from '../Controller/getEvents.js';
import { callEvents } from '../Controller/callEvents.js';

const router = express.Router();

// Route to get events
router.get('/api/events', getEvents);

// Route to generate events
router.post('/generate', (req, res) => {
  callEvents(req, res);
});

export default router;