import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import authRoutes        from './routes/authRoutes.js';
import recipeRoutes      from './routes/recipeRoutes.js';
import schemeRoutes      from './routes/schemeRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import reminderRoutes    from './routes/reminderRoutes.js';
import scamRoutes        from './routes/scamRoutes.js';
import groceryRoutes     from './routes/groceryRoutes.js';
import customerRoutes    from './routes/customerRoutes.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger (dev only)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
  });
}

// ── MongoDB ────────────────────────────────────────────────────────────────
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/saarthi-ai');
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('⚠️  Running without database — auth endpoints will not work');
  }
};
connectDB();

// ── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status:   'OK',
    message:  '🚀 Saarthi AI Backend is running',
    version:  '2.0.0',
    db:       mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time:     new Date().toISOString(),
    endpoints: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET  /api/auth/profile',
      'GET  /api/recipes',
      'POST /api/recipes',
      'GET  /api/schemes',
      'GET  /api/scholarships',
      'GET  /api/reminders',
      'POST /api/reminders',
      'POST /api/scam/analyze',
      'GET  /api/scam/tips/:type',
      'GET  /api/grocery',
      'POST /api/grocery/item',
      'POST /api/grocery/optimize',
      'GET  /api/customers',
      'POST /api/customers',
    ],
  });
});

// ── API Routes ─────────────────────────────────────────────────────────────
app.use('/api/auth',         authRoutes);
app.use('/api/recipes',      recipeRoutes);
app.use('/api/schemes',      schemeRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/reminders',    reminderRoutes);
app.use('/api/scam',         scamRoutes);
app.use('/api/grocery',      groceryRoutes);
app.use('/api/customers',    customerRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found', hint: 'Check GET /api/health for available endpoints' });
});

// ── Global error handler ──────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', detail: err.message });
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Saarthi AI Backend running on http://localhost:${PORT}`);
  console.log(`📋 API Docs: http://localhost:${PORT}/api/health\n`);
});

export default app;
