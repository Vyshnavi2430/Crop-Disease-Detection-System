const mongoose = require('mongoose');

const agriShopSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nameTranslations: { type: Map, of: String, default: undefined },
  type: { type: String, required: true },
  category: { type: String, required: true },
  state: { type: String, required: true, index: true },
  district: { type: String, required: true, index: true },
  place: { type: String },
  town: { type: String },
  address: { type: String, required: true },
  distance: { type: String, default: '1.5 km' },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 100 },
  contact: { type: String },
  phone: { type: String },
  timing: { type: String, default: '08:00 AM - 08:00 PM' },
  timings: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  mapsUrl: { type: String },
  dataSource: { type: String, enum: ['verified', 'sample', 'live'], default: 'sample' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AgriShop', agriShopSchema);
