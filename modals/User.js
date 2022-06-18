const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    profileImg: { type: String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    MainAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

export default mongoose.model("User", UserSchema);
