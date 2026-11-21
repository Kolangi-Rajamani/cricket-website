import mongoose from 'mongoose';

const playerInningsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  runs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  sr: { type: Number, default: 0 },
  outStatus: { type: String, default: 'not out' }, // 'b Starc', 'c Smith b Cummins', 'not out', etc.
  isBatting: { type: Boolean, default: false },
  isStriker: { type: Boolean, default: false },
});

const bowlerInningsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  overs: { type: Number, default: 0 },
  maidens: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  economy: { type: Number, default: 0 },
  isBowling: { type: Boolean, default: false },
});

const commentaryBallSchema = new mongoose.Schema({
  id: { type: String },
  ball: { type: String, required: true }, // e.g. "17.4"
  over: { type: Number, required: true }, // 18
  runs: { type: Number, default: 0 },
  tag: { 
    type: String, 
    enum: ['DOT', 'SINGLE', 'TWO', 'THREE', 'FOUR', 'SIX', 'WICKET', 'WIDE', 'NOBALL', 'BYE', 'LEG_BYE', 'INFO'],
    default: 'SINGLE'
  },
  text: { type: String, required: true },
  batsman: { type: String },
  bowler: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const matchSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true }, // e.g., "India vs Australia, Final"
  series: { type: String, required: true }, // e.g., "ICC Champions Trophy 2025"
  matchFormat: { type: String, enum: ['T20', 'ODI', 'TEST'], default: 'T20' },
  status: { 
    type: String, 
    enum: ['LIVE', 'UPCOMING', 'COMPLETED', 'INNINGS_BREAK'], 
    default: 'UPCOMING' 
  },
  statusNote: { type: String, default: '' }, // e.g. "India need 24 runs in 18 balls" or "India won by 6 wickets"
  venue: { type: String, required: true }, // e.g. "Melbourne Cricket Ground, Melbourne"
  date: { type: String, required: true },
  time: { type: String, default: '19:00 IST' },
  toss: { type: String, default: '' },
  
  teamA: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    flag: { type: String, required: true },
    score: { type: String, default: '0/0' },
    overs: { type: String, default: '0.0' },
    crr: { type: Number, default: 0 },
    inningsRuns: { type: Number, default: 0 },
    inningsWickets: { type: Number, default: 0 },
    inningsBalls: { type: Number, default: 0 },
  },

  teamB: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    flag: { type: String, required: true },
    score: { type: String, default: '0/0' },
    overs: { type: String, default: '0.0' },
    crr: { type: Number, default: 0 },
    inningsRuns: { type: Number, default: 0 },
    inningsWickets: { type: Number, default: 0 },
    inningsBalls: { type: Number, default: 0 },
  },

  currentInning: { type: Number, default: 1 },
  battingTeam: { type: String, default: 'teamA' }, // 'teamA' or 'teamB'
  target: { type: Number, default: 0 },
  requiredRunRate: { type: Number, default: 0 },
  currentRunRate: { type: Number, default: 0 },

  // Live score details
  batsmen: [playerInningsSchema],
  bowlers: [bowlerInningsSchema],
  
  // Historical / Full Innings Scorecard
  scorecard: {
    inning1: {
      team: { type: String },
      total: { type: String },
      overs: { type: String },
      extras: { type: String, default: '8 (w 4, nb 1, b 1, lb 2)' },
      batting: [playerInningsSchema],
      bowling: [bowlerInningsSchema],
      fallOfWickets: [{ score: String, over: String, player: String }],
    },
    inning2: {
      team: { type: String },
      total: { type: String },
      overs: { type: String },
      extras: { type: String, default: '6 (w 3, nb 0, b 0, lb 3)' },
      batting: [playerInningsSchema],
      bowling: [bowlerInningsSchema],
      fallOfWickets: [{ score: String, over: String, player: String }],
    }
  },

  commentary: [commentaryBallSchema],

  squads: {
    teamA: [{ id: String, name: String, role: String, image: String }],
    teamB: [{ id: String, name: String, role: String, image: String }],
  },

  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

const Match = mongoose.model('Match', matchSchema);
export default Match;
