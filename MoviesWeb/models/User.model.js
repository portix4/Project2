const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      default: ""
    },
    favouritesmovies: {
      type: [Number],
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
