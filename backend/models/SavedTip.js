const mongoose = require('mongoose');

const savedTipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipId: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  content: { type: String, required: true },
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedTip', savedTipSchema);
