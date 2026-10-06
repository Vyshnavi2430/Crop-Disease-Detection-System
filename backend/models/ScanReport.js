const mongoose = require('mongoose');

const scanReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadedImage: { type: String, required: true },
  heatmapUrl: { type: String, default: null },
  cropName: { type: String, default: 'General Crop' },
  diseaseName: { type: String, required: true },
  confidenceScore: { type: Number, required: true },
  confidenceLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'High' },
  isLowConfidence: { type: Boolean, default: false },
  severityLevel: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], default: 'Moderate' },
  diseaseDescription: { type: String },
  symptoms: [{ type: String }],
  possibleCauses: [{ type: String }],
  chemicalTreatment: [{ type: String }],
  organicTreatment: [{ type: String }],
  fertilizerRecommendations: [{ type: String }],
  preventionMethods: [{ type: String }],
  futurePrecautions: [{ type: String }],
  weatherImpact: { type: String },
  recoverySuggestions: { type: String },
  smartRecommendations: [{ type: String }],
  environmentalRisk: { type: mongoose.Schema.Types.Mixed, default: null },
  language: { type: String, default: 'en' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanReport', scanReportSchema);
