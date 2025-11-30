const mongoose = require("mongoose");

const SitemapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  urlsFound: {
    type: Number,
    required: true,
  },
  urls: [
    {
      type: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SitemapReport", SitemapSchema);