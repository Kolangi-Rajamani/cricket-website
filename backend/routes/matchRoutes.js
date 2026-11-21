import express from 'express';
import { getMatches, getMatchById, liveEvents } from '../services/dataService.js';

const router = express.Router();

// GET all matches or by status query (?status=LIVE, ?status=UPCOMING, ?status=COMPLETED)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const matches = await getMatches(status);
    res.json({ success: true, count: matches.length, data: matches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET match by id
router.get('/:id', async (req, res) => {
  try {
    const match = await getMatchById(req.params.id);
    if (!match) return res.status(404).json({ success: false, message: 'Match not found' });
    res.json({ success: true, data: match });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Server-Sent Events (SSE) for Live Match Updates!
router.get('/:id/live-stream', (req, res) => {
  const matchId = req.params.id;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const sendUpdate = async (eventData) => {
    try {
      const match = await getMatchById(matchId);
      res.write(`data: ${JSON.stringify({ type: 'UPDATE', data: match, event: eventData })}\n\n`);
    } catch (e) {}
  };

  liveEvents.on('match-updated', sendUpdate);

  // Initial push
  getMatchById(matchId).then(match => {
    if (match) {
      res.write(`data: ${JSON.stringify({ type: 'INIT', data: match })}\n\n`);
    }
  });

  req.on('close', () => {
    liveEvents.off('match-updated', sendUpdate);
  });
});

export default router;
