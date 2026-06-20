import Scheme from '../models/Scheme.js';

export const getSchemes = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const schemes = await Scheme.find(query);
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createScheme = async (req, res) => {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
