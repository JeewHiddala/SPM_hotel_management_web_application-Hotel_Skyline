const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  new mongoose.Schema({
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles"
    }
  })
);

module.exports = User;