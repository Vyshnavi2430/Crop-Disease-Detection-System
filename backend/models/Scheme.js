const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  schemeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortName: { type: String, required: true },
  overview: { type: String, required: true },
  eligibility: [{ type: String }],
  benefits: [{ type: String }],
  documentsRequired: [{ type: String }],
  applicationProcess: [{ type: String }],
  officialUrl: { type: String, required: true },
  category: { type: String, default: 'Central' }
});

module.exports = mongoose.model('Scheme', schemeSchema);
