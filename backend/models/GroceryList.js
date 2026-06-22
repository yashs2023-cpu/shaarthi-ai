import mongoose from 'mongoose';

const groceryItemSchema = new mongoose.Schema({
  item:     { type: String, required: true },
  quantity: { type: String, required: true },
  bought:   { type: Boolean, default: false },
  price:    Number,
});

const groceryListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:   { type: String, default: 'My Grocery List' },
  items:  [groceryItemSchema],
}, { timestamps: true });

export default mongoose.model('GroceryList', groceryListSchema);
