const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema({
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
    },
  ],
  brokenLinks: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Check", checkSchema);
