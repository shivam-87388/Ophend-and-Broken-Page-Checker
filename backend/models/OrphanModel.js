const mongoose = require('mongoose');

const OrphanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  websiteUrl: {
    type: String,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  orphanedPages: [
    {
      url: { type: String, required: true }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('OrphanReport', OrphanSchema);
