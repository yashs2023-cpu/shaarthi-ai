import express from 'express';
import { getList, addItem, updateItem, deleteItem, optimize } from '../controllers/groceryController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/',                 getList);
router.post('/item',            addItem);
router.patch('/item/:itemId',   updateItem);
router.delete('/item/:itemId',  deleteItem);
router.post('/optimize',        optimize);

export default router;
