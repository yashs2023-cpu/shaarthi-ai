import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: Number,
  eligibility: String,
  deadline: Date,
  description: String,
  category: { type: String, enum: ['merit', 'need-based', 'category-specific'] },
  university: String,
  applicationUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Scholarship', scholarshipSchema);
