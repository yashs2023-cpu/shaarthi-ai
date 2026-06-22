import Scholarship from '../models/Scholarship.js';

export const getScholarships = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const scholarships = await Scholarship.find(query);
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createScholarship = async (req, res) => {
  try {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
