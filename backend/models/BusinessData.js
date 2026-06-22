import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  category:    String,
  amount:      Number,
  description: String,
  date:        { type: Date, default: Date.now },
  status:      { type: String, enum: ['paid', 'pending'], default: 'pending' },
});

const businessDataSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalSales:  { type: Number, default: 0 },
  totalExpenses: { type: Number, default: 0 },
  customers:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
  expenses:    [expenseSchema],
  month:       { type: String },   // e.g. "2025-06"
}, { timestamps: true });

export default mongoose.model('BusinessData', businessDataSchema);
