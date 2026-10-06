const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { connectDB } = require('./config/db');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');
const scanRoutes = require('./routes/scanRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const marketRoutes = require('./routes/marketRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const shopRoutes = require('./routes/shopRoutes');

const app = express();

// Connect Database
connectDB();

// Security: HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' } // allow static uploads to load in browser
}));

// CORS
const clientUrl = process.env.CLIENT_URL;
const corsOptions = {
  origin: clientUrl && clientUrl.trim() !== '' && clientUrl !== '*'
    ? [clientUrl, 'http://localhost:5173', 'http://localhost:3000']
    : '*',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Rate Limiting — auth endpoints (login/register/reset-password)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  message: { message: 'Too many attempts from this IP. Please wait 15 minutes before trying again.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate Limiting — AI crop scan (expensive ML inference)
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { message: 'Too many AI scan requests. Please wait a moment.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Serve Uploaded Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/ai', aiLimiter, aiRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/shops', shopRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'KrishiDrishti AI Master Platform',
    version: '2.0.0',
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[KrishiDrishti Backend running on port ${PORT}]`);
});
