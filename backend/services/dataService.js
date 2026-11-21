import { teams as initialTeams, players as initialPlayers, matches as initialMatches, newsArticles as initialNews } from '../data/seedData.js';
import Match from '../models/Match.js';
import Player from '../models/Player.js';
import Team from '../models/Team.js';
import News from '../models/News.js';
import mongoose from 'mongoose';
import { EventEmitter } from 'events';

export const liveEvents = new EventEmitter();

// In-Memory store as cache & zero-config fallback
let memoryTeams = JSON.parse(JSON.stringify(initialTeams));
let memoryPlayers = JSON.parse(JSON.stringify(initialPlayers));
let memoryMatches = JSON.parse(JSON.stringify(initialMatches));
let memoryNews = JSON.parse(JSON.stringify(initialNews));

const isMongoConnected = () => mongoose.connection.readyState === 1;

// Initialize MongoDB seed if connected
export const initializeDatabase = async () => {
  if (isMongoConnected()) {
    try {
      const matchCount = await Match.countDocuments();
      if (matchCount === 0) {
        console.log('[Database] Seeding initial data into MongoDB...');
        const teamsToInsert = initialTeams.map(t => ({ ...t, _id: t.id }));
        const playersToInsert = initialPlayers.map(p => ({ ...p, _id: p.id }));
        await Team.insertMany(teamsToInsert);
        await Player.insertMany(playersToInsert);
        await Match.insertMany(initialMatches);
        await News.insertMany(initialNews);
        console.log('[Database] MongoDB seeded successfully!');
      }
    } catch (err) {
      console.warn('[Database] Error checking/seeding MongoDB:', err.message);
    }
  } else {
    console.log('[Database] Running in fast in-memory store mode (Ready for live operations)');
  }
};

export const resetDataToDefault = async () => {
  memoryTeams = JSON.parse(JSON.stringify(initialTeams));
  memoryPlayers = JSON.parse(JSON.stringify(initialPlayers));
  memoryMatches = JSON.parse(JSON.stringify(initialMatches));
  memoryNews = JSON.parse(JSON.stringify(initialNews));

  if (isMongoConnected()) {
    try {
      await Team.deleteMany({});
      await Player.deleteMany({});
      await Match.deleteMany({});
      await News.deleteMany({});

      const teamsToInsert = initialTeams.map(t => ({ ...t, _id: t.id }));
      const playersToInsert = initialPlayers.map(p => ({ ...p, _id: p.id }));
      await Team.insertMany(teamsToInsert);
      await Player.insertMany(playersToInsert);
      await Match.insertMany(initialMatches);
      await News.insertMany(initialNews);
    } catch (e) {
      console.error('Mongo reset error:', e);
    }
  }

  liveEvents.emit('match-updated', { type: 'RESET' });
  return { success: true, message: 'Database reset to default seed data' };
};

// MATCHES
export const getMatches = async (status) => {
  if (isMongoConnected()) {
    try {
      const query = status ? { status: status.toUpperCase() } : {};
      const matches = await Match.find(query).sort({ updatedAt: -1 });
      if (matches.length > 0) return matches;
    } catch (e) {
      console.warn('Mongo find error, fallback to memory', e.message);
    }
  }
  
  if (!status) return memoryMatches;
  return memoryMatches.filter(m => m.status.toUpperCase() === status.toUpperCase());
};

export const getMatchById = async (id) => {
  if (isMongoConnected()) {
    try {
      const match = await Match.findOne({ $or: [{ _id: id }, { id }] });
      if (match) return match;
    } catch (e) {}
  }
  return memoryMatches.find(m => m._id === id || m.id === id);
};

export const createMatch = async (data) => {
  const newMatch = {
    ...data,
    _id: 'm_' + Date.now(),
    status: data.status || 'UPCOMING',
    commentary: data.commentary || [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  memoryMatches.unshift(newMatch);

  if (isMongoConnected()) {
    try {
      const created = await Match.create(newMatch);
      return created;
    } catch (e) {
      console.error('Mongo create match error:', e);
    }
  }

  liveEvents.emit('match-updated', { type: 'CREATE', match: newMatch });
  return newMatch;
};

export const updateMatch = async (id, data) => {
  const index = memoryMatches.findIndex(m => m._id === id || m.id === id);
  if (index !== -1) {
    memoryMatches[index] = { ...memoryMatches[index], ...data, updatedAt: new Date() };
  }

  let updated = memoryMatches[index];

  if (isMongoConnected()) {
    try {
      const doc = await Match.findOneAndUpdate(
        { $or: [{ _id: id }, { id }] },
        { $set: data },
        { new: true }
      );
      if (doc) updated = doc;
    } catch (e) {}
  }

  liveEvents.emit('match-updated', { type: 'UPDATE', match: updated });
  return updated;
};

export const deleteMatch = async (id) => {
  memoryMatches = memoryMatches.filter(m => m._id !== id && m.id !== id);

  if (isMongoConnected()) {
    try {
      await Match.findOneAndDelete({ $or: [{ _id: id }, { id }] });
    } catch (e) {}
  }

  liveEvents.emit('match-updated', { type: 'DELETE', matchId: id });
  return { success: true };
};

// LIVE BALL SCORING ENGINE
export const addBallScoring = async (matchId, { runs = 0, isExtra = false, extraType = '', isWicket = false, outPlayer = '', text = '', bowlerName, batsmanName }) => {
  const match = await getMatchById(matchId);
  if (!match) throw new Error('Match not found');

  const battingTeamKey = match.battingTeam || 'teamB';
  const battingTeam = match[battingTeamKey];
  const otherTeamKey = battingTeamKey === 'teamA' ? 'teamB' : 'teamA';
  const otherTeam = match[otherTeamKey];

  // Parse current overs
  const currentOversStr = battingTeam.overs || '0.0';
  const [ovNumStr, ballNumStr] = currentOversStr.split('.');
  let overNum = parseInt(ovNumStr, 10) || 0;
  let ballNum = parseInt(ballNumStr, 10) || 0;

  // Increment ball if not a wide or no-ball
  const isLegalBall = !(extraType === 'WIDE' || extraType === 'NOBALL');
  if (isLegalBall) {
    ballNum += 1;
    if (ballNum >= 6) {
      overNum += 1;
      ballNum = 0;
    }
  }

  const newOverStr = `${overNum}.${ballNum}`;
  const runsScored = parseInt(runs, 10) || 0;

  // Update total runs & wickets
  battingTeam.inningsRuns = (battingTeam.inningsRuns || 0) + runsScored;
  if (isWicket) {
    battingTeam.inningsWickets = (battingTeam.inningsWickets || 0) + 1;
  }
  battingTeam.score = `${battingTeam.inningsRuns}/${battingTeam.inningsWickets}`;
  battingTeam.overs = newOverStr;

  // Calculate Run Rate
  const totalBalls = overNum * 6 + ballNum;
  if (totalBalls > 0) {
    battingTeam.crr = parseFloat(((battingTeam.inningsRuns / totalBalls) * 6).toFixed(2));
    match.currentRunRate = battingTeam.crr;
  }

  // Update Batsmen
  if (match.batsmen && match.batsmen.length > 0) {
    const striker = match.batsmen.find(b => b.isStriker) || match.batsmen[0];
    if (striker && isLegalBall) {
      striker.balls = (striker.balls || 0) + 1;
      striker.runs = (striker.runs || 0) + (isExtra ? 0 : runsScored);
      if (runsScored === 4) striker.fours = (striker.fours || 0) + 1;
      if (runsScored === 6) striker.sixes = (striker.sixes || 0) + 1;
      striker.sr = parseFloat(((striker.runs / striker.balls) * 100).toFixed(2));
    }
    
    // Switch strike on odd runs (1, 3) or at end of over
    const oddRuns = (runsScored % 2 !== 0);
    const endOfOver = (isLegalBall && ballNum === 0);
    const shouldRotate = (oddRuns && !endOfOver) || (!oddRuns && endOfOver);
    if (shouldRotate && match.batsmen.length >= 2) {
      match.batsmen.forEach(b => { b.isStriker = !b.isStriker; });
    }
  }

  // Determine Tag
  let tag = 'SINGLE';
  if (isWicket) tag = 'WICKET';
  else if (runsScored === 0 && !isExtra) tag = 'DOT';
  else if (runsScored === 4) tag = 'FOUR';
  else if (runsScored === 6) tag = 'SIX';
  else if (runsScored === 2) tag = 'TWO';
  else if (runsScored === 3) tag = 'THREE';
  else if (extraType === 'WIDE') tag = 'WIDE';
  else if (extraType === 'NOBALL') tag = 'NOBALL';

  const commentaryEntry = {
    id: 'c_' + Date.now(),
    ball: newOverStr,
    over: ballNum === 0 ? overNum : overNum + 1,
    runs: runsScored,
    tag,
    text: text || `${runsScored} run(s) scored. ${newOverStr} overs.`,
    bowler: bowlerName || (match.bowlers?.[0]?.name || 'Bowler'),
    batsman: batsmanName || (match.batsmen?.[0]?.name || 'Batsman'),
    timestamp: new Date()
  };

  if (!match.commentary) match.commentary = [];
  match.commentary.unshift(commentaryEntry);

  // Check Target / Win condition
  if (match.target && match.currentInning === 2) {
    const runsNeeded = match.target - battingTeam.inningsRuns;
    const ballsRemaining = (match.matchFormat === 'T20' ? 120 : 300) - totalBalls;
    if (runsNeeded <= 0) {
      match.status = 'COMPLETED';
      match.statusNote = `${battingTeam.name} won by ${10 - battingTeam.inningsWickets} wickets!`;
    } else if (battingTeam.inningsWickets >= 10 || ballsRemaining <= 0) {
      match.status = 'COMPLETED';
      match.statusNote = `${otherTeam.name} won by ${runsNeeded - 1} runs!`;
    } else {
      match.requiredRunRate = parseFloat(((runsNeeded / ballsRemaining) * 6).toFixed(2));
      match.statusNote = `${battingTeam.name} need ${runsNeeded} runs in ${ballsRemaining} balls`;
    }
  }

  await updateMatch(matchId, match);
  return { match, ball: commentaryEntry };
};

// SIMULATION ENGINE (For dynamic demo)
const simulationPhrases = [
  { runs: 4, tag: 'FOUR', text: 'FOUR! Elegant cover drive! Pure timing from the middle of the bat, piercing the gap at extra cover to the fence.' },
  { runs: 6, tag: 'SIX', text: 'SIX! Cleared the ropes easily! Down the track, lofted high and handsome over wide long-on for a colossal maximum!' },
  { runs: 1, tag: 'SINGLE', text: 'Tucked off the hips towards backward square leg for a quick single. Excellent communication between the wickets.' },
  { runs: 2, tag: 'TWO', text: 'Pushed into the gap at deep mid-wicket. Superb hustle and they comfortably come back for the brace.' },
  { runs: 0, tag: 'DOT', text: 'Beaten! Lovely seam movement outside off-stump, shaping past the tentative defensive poke.' },
  { runs: 1, tag: 'SINGLE', text: 'Steered down to third man with soft hands. Rotates the strike effortlessly.' },
  { runs: 4, tag: 'FOUR', text: 'FOUR! Slashed over backward point! Width offered and punished in trademark aggressive style.' }
];

export const simulateLiveBall = async (matchId = 'm1') => {
  const match = await getMatchById(matchId);
  if (!match || match.status !== 'LIVE') return null;

  const event = simulationPhrases[Math.floor(Math.random() * simulationPhrases.length)];
  const striker = match.batsmen?.find(b => b.isStriker) || match.batsmen?.[0];
  const bowler = match.bowlers?.find(b => b.isBowling) || match.bowlers?.[0];

  return await addBallScoring(matchId, {
    runs: event.runs,
    text: `${event.text} (${striker?.name || 'Batsman'} vs ${bowler?.name || 'Bowler'})`,
    bowlerName: bowler?.name,
    batsmanName: striker?.name
  });
};

// PLAYERS
export const getPlayers = async (country, role, search) => {
  let list = memoryPlayers;
  if (isMongoConnected()) {
    try {
      const q = {};
      if (country) q.country = new RegExp(country, 'i');
      if (role) q.role = new RegExp(role, 'i');
      if (search) q.name = new RegExp(search, 'i');
      const docs = await Player.find(q);
      if (docs.length > 0) return docs;
    } catch (e) {}
  }

  if (country) {
    list = list.filter(p => p.country.toLowerCase() === country.toLowerCase() || p.countryCode.toLowerCase() === country.toLowerCase());
  }
  if (role) {
    list = list.filter(p => p.role.toLowerCase().includes(role.toLowerCase()));
  }
  if (search) {
    const s = search.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(s) || p.country.toLowerCase().includes(s));
  }
  return list;
};

export const getPlayerById = async (id) => {
  if (isMongoConnected()) {
    try {
      const doc = await Player.findOne({ id });
      if (doc) return doc;
    } catch (e) {}
  }
  return memoryPlayers.find(p => p.id === id);
};

export const createPlayer = async (data) => {
  const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const player = { ...data, id, createdAt: new Date() };
  memoryPlayers.push(player);

  if (isMongoConnected()) {
    try {
      await Player.create(player);
    } catch (e) {}
  }
  return player;
};

export const updatePlayer = async (id, data) => {
  const idx = memoryPlayers.findIndex(p => p.id === id);
  if (idx !== -1) {
    memoryPlayers[idx] = { ...memoryPlayers[idx], ...data, updatedAt: new Date() };
  }
  if (isMongoConnected()) {
    try {
      await Player.findOneAndUpdate({ id }, { $set: data });
    } catch (e) {}
  }
  return memoryPlayers[idx];
};

export const deletePlayer = async (id) => {
  memoryPlayers = memoryPlayers.filter(p => p.id !== id);
  if (isMongoConnected()) {
    try {
      await Player.findOneAndDelete({ id });
    } catch (e) {}
  }
  return { success: true };
};

// TEAMS & RANKINGS
export const getTeams = async () => {
  if (isMongoConnected()) {
    try {
      const docs = await Team.find();
      if (docs.length > 0) return docs;
    } catch (e) {}
  }
  return memoryTeams;
};

export const getTeamById = async (id) => {
  if (isMongoConnected()) {
    try {
      const doc = await Team.findOne({ id });
      if (doc) return doc;
    } catch (e) {}
  }
  return memoryTeams.find(t => t.id === id || t.code === id || t.shortName.toLowerCase() === id.toLowerCase());
};

// NEWS
export const getNews = async (category) => {
  if (isMongoConnected()) {
    try {
      const q = category ? { category } : {};
      const docs = await News.find(q).sort({ publishedAt: -1 });
      if (docs.length > 0) return docs;
    } catch (e) {}
  }
  if (!category) return memoryNews;
  return memoryNews.filter(n => n.category.toLowerCase() === category.toLowerCase());
};

export const getNewsById = async (id) => {
  if (isMongoConnected()) {
    try {
      const doc = await News.findOne({ $or: [{ _id: id }, { id }] });
      if (doc) return doc;
    } catch (e) {}
  }
  return memoryNews.find(n => n._id === id || n.id === id);
};

export const createNews = async (data) => {
  const news = { ...data, _id: 'n_' + Date.now(), publishedAt: new Date() };
  memoryNews.unshift(news);
  if (isMongoConnected()) {
    try {
      await News.create(news);
    } catch (e) {}
  }
  return news;
};
