const mongoose = require("mongoose");

const TempDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    userID: { type: String, required: true },
    images: { type: Array, required: true },
    price: { type: Number, required: true, trim: true },
    brand: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    inStock: { type: Number, required: true, default: 0 },
    sold: { type: Number, default: 0 },
    userSelectedQty: { type: Number, required: true, default: 1 },
    checked: { type: Boolean, default: false },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("TempData", TempDataSchema);
