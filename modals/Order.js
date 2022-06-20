const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: String,
    phonenumber: String,
    products: Array,
    total: Number,
    delivery: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("Order", OrderSchema);
