import express from 'express';
import { getRecipes, createRecipe, getRecipeById, deleteRecipe } from '../controllers/recipeController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRecipes);
router.post('/', authenticateToken, createRecipe);
router.get('/:id', getRecipeById);
router.delete('/:id', authenticateToken, deleteRecipe);

export default router;
