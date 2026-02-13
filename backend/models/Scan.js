const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    website: String,
    type: String,
    results: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scan", scanSchema);
