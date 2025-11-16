const mongoose = require('mongoose');

const BrokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  websiteUrl: {
    type: String,
    required: true
  },
  totalLinks: {
    type: Number,
    required: true
  },
  brokenLinks: [
    {
      url: { type: String, required: true },
      status: { type: Number, required: true }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BrokenReport', BrokenSchema);
