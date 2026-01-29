const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    companyName: {
      type: String
    },
    role: {
      type: String,
      enum: ["founder", "team", "indie"],
      default: "founder"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
