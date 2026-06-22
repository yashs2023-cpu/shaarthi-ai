import Customer from '../models/Customer.js';

// GET /api/customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/customers
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({ ...req.body, userId: req.userId });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/customers/:id
export const getCustomer = async (req, res) => {
  try {
    const c = await Customer.findOne({ _id: req.params.id, userId: req.userId });
    if (!c) return res.status(404).json({ error: 'Customer not found' });
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/customers/:id
export const updateCustomer = async (req, res) => {
  try {
    const c = await Customer.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!c) return res.status(404).json({ error: 'Customer not found' });
    res.json(c);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/customers/:id
export const deleteCustomer = async (req, res) => {
  try {
    const c = await Customer.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!c) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
