import express from 'express';
import { analyzeMessage, getHistory, reportScam, getTips } from '../controllers/scamController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public endpoint — no auth needed to analyze
router.post('/analyze', analyzeMessage);
router.get('/tips/:type', getTips);
router.get('/tips',       getTips);

// Auth-protected
router.get('/history',   authenticateToken, getHistory);
router.post('/report',   authenticateToken, reportScam);

export default router;
