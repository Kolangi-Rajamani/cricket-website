import express from 'express';
import { getTeams, getTeamById } from '../services/dataService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teams = await getTeams();
    res.json({ success: true, count: teams.length, data: teams });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/rankings', async (req, res) => {
  try {
    const teams = await getTeams();
    const testRankings = [...teams].sort((a, b) => (a.ranking?.test?.rank || 99) - (b.ranking?.test?.rank || 99));
    const odiRankings = [...teams].sort((a, b) => (a.ranking?.odi?.rank || 99) - (b.ranking?.odi?.rank || 99));
    const t20Rankings = [...teams].sort((a, b) => (a.ranking?.t20?.rank || 99) - (b.ranking?.t20?.rank || 99));

    res.json({
      success: true,
      data: {
        test: testRankings,
        odi: odiRankings,
        t20: t20Rankings
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await getTeamById(req.params.id);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });
    res.json({ success: true, data: team });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
