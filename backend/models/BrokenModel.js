const mongoose = require("mongoose");

const BrokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  totalLinks: {
    type: Number,
    required: true,
  },
  brokenLinks: [
    {
      url: String,
      status: Number,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BrokenReport", BrokenSchema);
