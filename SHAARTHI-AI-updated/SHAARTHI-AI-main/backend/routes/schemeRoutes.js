import express from 'express';
import { getSchemes, createScheme, getSchemeById } from '../controllers/schemeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSchemes);
router.post('/', authenticateToken, createScheme);
router.get('/:id', getSchemeById);

export default router;
