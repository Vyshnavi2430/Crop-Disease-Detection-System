const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  preferredLanguage: { type: String, default: 'en' }, // en, te, hi, ta, kn, mr
  state: { type: String, default: '' },
  district: { type: String, default: '' },
  profilePhoto: { type: String, default: '' },
  themePreference: { type: String, default: 'light' }, // light, dark
  accessibilityPreferences: {
    largeText: { type: Boolean, default: false },
    highContrast: { type: Boolean, default: false }
  },
  primaryCrop: { type: String, default: '' },
  landSize: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
