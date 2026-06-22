import GroceryList from '../models/GroceryList.js';

// GET /api/grocery
export const getList = async (req, res) => {
  try {
    let list = await GroceryList.findOne({ userId: req.userId });
    if (!list) list = await GroceryList.create({ userId: req.userId, items: [] });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/grocery/item  — add item
export const addItem = async (req, res) => {
  try {
    const { item, quantity } = req.body;
    if (!item || !quantity) return res.status(400).json({ error: 'item and quantity required' });

    let list = await GroceryList.findOne({ userId: req.userId });
    if (!list) list = new GroceryList({ userId: req.userId, items: [] });

    list.items.push({ item, quantity });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/grocery/item/:itemId  — mark bought
export const updateItem = async (req, res) => {
  try {
    const list = await GroceryList.findOne({ userId: req.userId });
    if (!list) return res.status(404).json({ error: 'List not found' });

    const item = list.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    Object.assign(item, req.body);
    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/grocery/item/:itemId
export const deleteItem = async (req, res) => {
  try {
    const list = await GroceryList.findOne({ userId: req.userId });
    if (!list) return res.status(404).json({ error: 'List not found' });

    list.items = list.items.filter(i => i._id.toString() !== req.params.itemId);
    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/grocery/optimize  — price optimization (mock with real structure)
export const optimize = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'items array required' });

    const result = {
      totalEstimate: items.length * 150 + Math.floor(Math.random() * 500),
      savings:       Math.floor(Math.random() * 300) + 100,
      bestStores: [
        { name: 'Local Kirana',  savings: '8%',  note: 'Best for fresh vegetables' },
        { name: 'DMart',         savings: '15%', note: 'Best for packaged goods' },
        { name: 'BigBasket',     savings: '12%', note: 'Best for home delivery' },
      ],
      itemDeals: items.map(name => ({
        item:          name,
        regularPrice:  Math.floor(Math.random() * 100) + 20,
        bestPrice:     Math.floor(Math.random() * 80) + 10,
        bestStore:     ['Local Market', 'DMart', 'BigBasket'][Math.floor(Math.random() * 3)],
      })),
    };
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
