import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  cuisine: { type: String, enum: ['north-indian', 'south-indian', 'gujarati', 'bengali'] },
  ingredients: [String],
  steps: [String],
  cookingTime: Number,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  nutrition: { calories: Number, protein: Number, fat: Number, carbs: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Recipe', recipeSchema);
