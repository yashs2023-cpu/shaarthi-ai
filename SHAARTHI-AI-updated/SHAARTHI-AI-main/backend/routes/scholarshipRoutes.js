import express from 'express';
import { getScholarships, createScholarship, getScholarshipById } from '../controllers/scholarshipController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getScholarships);
router.post('/', authenticateToken, createScholarship);
router.get('/:id', getScholarshipById);

export default router;
