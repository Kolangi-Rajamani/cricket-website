import express from 'express';
import {
  createMatch,
  updateMatch,
  deleteMatch,
  addBallScoring,
  simulateLiveBall,
  createPlayer,
  updatePlayer,
  deletePlayer,
  createNews,
  resetDataToDefault,
  getMatchById
} from '../services/dataService.js';

const router = express.Router();

// Active auto-simulators map { [matchId]: intervalId }
const activeSimulators = new Map();

// MATCH MANAGEMENT
router.post('/matches', async (req, res) => {
  try {
    const match = await createMatch(req.body);
    res.status(201).json({ success: true, data: match, message: 'Match created successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/matches/:id', async (req, res) => {
  try {
    const match = await updateMatch(req.params.id, req.body);
    res.json({ success: true, data: match, message: 'Match updated successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/matches/:id', async (req, res) => {
  try {
    await deleteMatch(req.params.id);
    if (activeSimulators.has(req.params.id)) {
      clearInterval(activeSimulators.get(req.params.id));
      activeSimulators.delete(req.params.id);
    }
    res.json({ success: true, message: 'Match deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// LIVE SCORER CONSOLE
router.post('/matches/:id/score-ball', async (req, res) => {
  try {
    const { runs, isExtra, extraType, isWicket, outPlayer, text, bowlerName, batsmanName } = req.body;
    const result = await addBallScoring(req.params.id, {
      runs: parseInt(runs, 10) || 0,
      isExtra: Boolean(isExtra),
      extraType,
      isWicket: Boolean(isWicket),
      outPlayer,
      text,
      bowlerName,
      batsmanName
    });
    res.json({ success: true, data: result, message: 'Ball scored successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// SINGLE BALL SIMULATION
router.post('/matches/:id/simulate-ball', async (req, res) => {
  try {
    const result = await simulateLiveBall(req.params.id);
    if (!result) {
      return res.status(400).json({ success: false, message: 'Match is not LIVE or not found' });
    }
    res.json({ success: true, data: result, message: 'Simulated 1 ball live' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// AUTO SIMULATION TOGGLE (Streams live commentary & scores continuously)
router.post('/matches/:id/toggle-simulation', (req, res) => {
  const matchId = req.params.id;
  const isRunning = activeSimulators.has(matchId);

  if (isRunning) {
    clearInterval(activeSimulators.get(matchId));
    activeSimulators.delete(matchId);
    return res.json({ success: true, isSimulating: false, message: 'Live match simulation stopped' });
  } else {
    const interval = setInterval(async () => {
      try {
        const match = await getMatchById(matchId);
        if (!match || match.status !== 'LIVE') {
          clearInterval(interval);
          activeSimulators.delete(matchId);
          return;
        }
        await simulateLiveBall(matchId);
      } catch (e) {
        console.error('Simulation loop error:', e);
      }
    }, 4500);

    activeSimulators.set(matchId, interval);
    return res.json({ success: true, isSimulating: true, message: 'Live match auto-simulation started! Scores will update every 4.5 seconds' });
  }
});

router.get('/matches/:id/simulation-status', (req, res) => {
  res.json({ isSimulating: activeSimulators.has(req.params.id) });
});

// PLAYER MANAGEMENT
router.post('/players', async (req, res) => {
  try {
    const player = await createPlayer(req.body);
    res.status(201).json({ success: true, data: player, message: 'Player added successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/players/:id', async (req, res) => {
  try {
    const player = await updatePlayer(req.params.id, req.body);
    res.json({ success: true, data: player, message: 'Player updated successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/players/:id', async (req, res) => {
  try {
    await deletePlayer(req.params.id);
    res.json({ success: true, message: 'Player removed successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// NEWS MANAGEMENT
router.post('/news', async (req, res) => {
  try {
    const news = await createNews(req.body);
    res.status(201).json({ success: true, data: news, message: 'News article published' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DATABASE RESET
router.post('/reset', async (req, res) => {
  try {
    // Clear all active simulators
    activeSimulators.forEach(intId => clearInterval(intId));
    activeSimulators.clear();

    const result = await resetDataToDefault();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
