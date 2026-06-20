import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['agriculture', 'employment', 'health', 'energy'] },
  benefit: String,
  description: String,
  eligibility: String,
  documents: [String],
  deadline: Date,
  applicationUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Scheme', schemeSchema);
