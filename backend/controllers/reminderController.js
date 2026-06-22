import Reminder from '../models/Reminder.js';

// GET /api/reminders  — list user's reminders
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.userId }).sort({ dueDate: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/reminders  — create reminder
export const createReminder = async (req, res) => {
  try {
    const { type, description, dueDate, repeat } = req.body;
    if (!description || !dueDate) {
      return res.status(400).json({ error: 'description and dueDate are required' });
    }
    const reminder = await Reminder.create({
      userId: req.userId, type, description, dueDate, repeat,
    });
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/reminders/:id  — mark done / snooze
export const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });
    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/reminders/:id
export const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
