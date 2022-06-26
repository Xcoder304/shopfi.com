const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("Categories", CategoriesSchema);
