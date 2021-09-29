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
    },
    pic:{
      type:String,
      default:"http://res.cloudinary.com/svxzwylz/image/upload/v1632669612/kvmauuzoshkezjnqajvc.png"
     }
  })
);

module.exports = User;