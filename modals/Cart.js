const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: { type: Array, required: true },
    price: { type: Number, required: true, trim: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    inStock: { type: Number, required: true, default: 0 },
    sold: { type: Number, required: true, default: 0 },
    content: { type: String, required: true },
    checked: { type: Boolean, default: false },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("Cart", CartSchema);
