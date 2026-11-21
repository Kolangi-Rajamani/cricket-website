import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  code: { type: String, required: true },
  flag: { type: String, required: true },
  logo: { type: String, required: true },
  primaryColor: { type: String, default: '#0055a5' },
  captain: { type: String, default: '' },
  coach: { type: String, default: '' },
  ranking: {
    test: { rank: Number, rating: Number, points: Number },
    odi: { rank: Number, rating: Number, points: Number },
    t20: { rank: Number, rating: Number, points: Number }
  },
  squad: [{
    id: String,
    name: String,
    role: String,
    image: String
  }]
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
export default Team;
