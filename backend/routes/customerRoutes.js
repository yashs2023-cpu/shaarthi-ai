import express from 'express';
import { getCustomers, createCustomer, getCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/',       getCustomers);
router.post('/',      createCustomer);
router.get('/:id',    getCustomer);
router.put('/:id',    updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
