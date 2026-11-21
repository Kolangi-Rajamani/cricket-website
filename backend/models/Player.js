import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  fullName: { type: String, default: '' },
  country: { type: String, required: true },
  countryCode: { type: String, required: true },
  countryFlag: { type: String, required: true },
  image: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Batter', 'Bowler', 'All-Rounder', 'Wicketkeeper Batter', 'Fast Bowler', 'Spin Bowler'], 
    default: 'Batter' 
  },
  battingStyle: { type: String, default: 'Right Handed Bat' },
  bowlingStyle: { type: String, default: 'Right-arm medium' },
  jerseyNumber: { type: Number, default: 0 },
  born: { type: String, default: '' },
  age: { type: Number, default: 28 },
  birthPlace: { type: String, default: '' },
  bio: { type: String, default: '' },
  
  // ICC Rankings
  iccRank: {
    testBatting: { type: Number, default: null },
    testBowling: { type: Number, default: null },
    odiBatting: { type: Number, default: null },
    odiBowling: { type: Number, default: null },
    t20Batting: { type: Number, default: null },
    t20Bowling: { type: Number, default: null },
  },

  // Career Statistics
  stats: {
    test: {
      matches: { type: Number, default: 0 },
      innings: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      highest: { type: String, default: '0' },
      avg: { type: Number, default: 0 },
      sr: { type: Number, default: 0 },
      centuries: { type: Number, default: 0 },
      fifties: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      bestBowling: { type: String, default: '0/0' },
      economy: { type: Number, default: 0 },
    },
    odi: {
      matches: { type: Number, default: 0 },
      innings: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      highest: { type: String, default: '0' },
      avg: { type: Number, default: 0 },
      sr: { type: Number, default: 0 },
      centuries: { type: Number, default: 0 },
      fifties: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      bestBowling: { type: String, default: '0/0' },
      economy: { type: Number, default: 0 },
    },
    t20: {
      matches: { type: Number, default: 0 },
      innings: { type: Number, default: 0 },
      runs: { type: Number, default: 0 },
      highest: { type: String, default: '0' },
      avg: { type: Number, default: 0 },
      sr: { type: Number, default: 0 },
      centuries: { type: Number, default: 0 },
      fifties: { type: Number, default: 0 },
      wickets: { type: Number, default: 0 },
      bestBowling: { type: String, default: '0/0' },
      economy: { type: Number, default: 0 },
    }
  }
}, {
  timestamps: true
});

const Player = mongoose.model('Player', playerSchema);
export default Player;
