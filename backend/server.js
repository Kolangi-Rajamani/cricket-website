import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { initializeDatabase } from './services/dataService.js';
import matchRoutes from './routes/matchRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'Cricbuzz Clone API'
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🏏 Cricbuzz Clone Backend Server running on port ${PORT}`);
    console.log(`📡 API Endpoints available at: http://localhost:${PORT}/api`);
    console.log(`⚡ Live SSE Stream available at: http://localhost:${PORT}/api/matches/:id/live-stream`);
    console.log(`🛡️ Admin Console API at: http://localhost:${PORT}/api/admin`);
    console.log(`===============================================`);
  });
};

startServer().catch(err => {
  console.error('Fatal Server Startup Error:', err);
});
