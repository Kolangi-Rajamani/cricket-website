import express from 'express';
import { getPlayers, getPlayerById } from '../services/dataService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { country, role, search } = req.query;
    const players = await getPlayers(country, role, search);
    res.json({ success: true, count: players.length, data: players });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (!player) return res.status(404).json({ success: false, message: 'Player not found' });
    res.json({ success: true, data: player });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
