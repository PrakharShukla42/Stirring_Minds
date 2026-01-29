const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    partnerName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["cloud", "marketing", "analytics", "productivity", "devtools"],
      required: true
    },
    accessLevel: {
      type: String,
      enum: ["public", "locked"],
      default: "public"
    },
    eligibilityText: {
      type: String
    },
    logoUrl: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    expiresAt: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", dealSchema);
