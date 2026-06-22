import mongoose from 'mongoose';

const scamReportSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messageType: { type: String, enum: ['sms', 'whatsapp', 'upi', 'url', 'email'], default: 'sms' },
  content:     { type: String, required: true },
  riskScore:   { type: Number, min: 0, max: 100 },
  riskLevel:   { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
  threats:     [{ type: String, risk: String, description: String }],
  recommendation: String,
  reported:    { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('ScamReport', scamReportSchema);
