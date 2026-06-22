import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:        { type: String, enum: ['medicine', 'bill', 'event', 'appointment'], default: 'medicine' },
  description: { type: String, required: true },
  dueDate:     { type: Date, required: true },
  status:      { type: String, enum: ['active', 'done', 'snoozed'], default: 'active' },
  repeat:      { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
}, { timestamps: true });

export default mongoose.model('Reminder', reminderSchema);
