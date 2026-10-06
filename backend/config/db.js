const mongoose = require('mongoose');

let isMockMode = false;

const mockStore = {
  users: [],
  scanReports: [],
  savedTips: [],
  schemes: []
};

function sanitizeMongoError(error) {
  const message = error?.message || String(error);
  return message
    .replace(/mongodb(?:\+srv)?:\/\/[^\s]+/gi, 'mongodb://[redacted]')
    .split('\n')[0];
}

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error('[MongoDB Error]: MONGODB_URI is not configured.');
    isMockMode = true;
    console.warn('[MongoDB] Fallback storage activated because Atlas configuration is missing.');
    return;
  }

  try {
    console.log('[MongoDB] Connecting to MongoDB Atlas...');

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      family: 4
    });

    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    console.log('[MongoDB] Database:', conn.connection.name);

    isMockMode = false;

  } catch (error) {
    console.error('[MongoDB Atlas Error]:', sanitizeMongoError(error));

    // Do NOT silently pretend Atlas is connected.
    isMockMode = true;

    console.warn('[MongoDB] Fallback storage activated because Atlas connection failed.');
  }
};

const getIsMockMode = () => isMockMode;

const getMockStore = () => mockStore;

module.exports = {
  connectDB,
  getIsMockMode,
  getMockStore
};