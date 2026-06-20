import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: String,
  email: String,
  company: String,
  address: String,
  purchaseHistory: [{ date: Date, amount: Number, description: String }],
  totalSpent: Number,
  lastOrder: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Customer', customerSchema);
