import pool from '../db.js';

export const bulkPitch = async (req, res) => {
  const { events, pitchContent } = req.body;

  if (!events || !pitchContent) {
    return res.status(400).json({ error: 'Events and pitch content are required' });
  }

  try {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const pitchQuery = 'INSERT INTO pitches (content) VALUES ($1) RETURNING id';
      const pitchResult = await client.query(pitchQuery, [pitchContent]);
      const pitchId = pitchResult.rows[0].id;

      const eventPitchQuery = 'INSERT INTO event_pitches (event_id, pitch_id) VALUES ($1, $2)';
      for (const eventId of events) {
        await client.query(eventPitchQuery, [eventId, pitchId]);
      }

      await client.query('COMMIT');
      res.status(200).json({ message: 'Bulk pitch submitted successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error processing bulk pitch:', error);
      res.status(500).json({ error: 'Error processing bulk pitch' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Error connecting to the database' });
  }
};
