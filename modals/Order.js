const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    userDatils: { type: Object, required: true },
    paymentMethod: { type: String, required: true },
    paymentInfo: { type: Object, required: true },
    products: Array,
    total: { type: Number, required: true },
    delivery: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("Order", OrderSchema);
