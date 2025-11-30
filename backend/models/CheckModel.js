const mongoose = require("mongoose");

const CheckSchema = new mongoose.Schema({
  checkedPage: {
    type: String,
    required: true,
  },
  totalLinks: {
    type: Number,
    required: true,
  },
  results: [
    {
      url: String,
      status: mongoose.Schema.Types.Mixed,
      type: String,
      error: String,
    }
  ],
  brokenLinks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CheckReport", CheckSchema);
