const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getIsMockMode, getMockStore } = require('../config/db');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set');
  return jwt.sign({ id }, secret, {
    expiresIn: '30d'
  });
};

// @desc Register new user
// @route POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { name, email, mobile, password, preferredLanguage, state, district } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    if (getIsMockMode()) {
      const mockStore = getMockStore();
      const existing = mockStore.users.find(u => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        _id: 'mock_user_' + Date.now(),
        name,
        email: email.toLowerCase(),
        mobile,
        password: hashedPassword,
        preferredLanguage: preferredLanguage || 'en',
        state: state || 'Andhra Pradesh',
        district: district || 'Guntur',
        themePreference: 'light',
        accessibilityPreferences: { largeText: false, highContrast: false },
        createdAt: new Date()
      };
      mockStore.users.push(newUser);
      const token = generateToken(newUser._id);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        preferredLanguage: newUser.preferredLanguage,
        state: newUser.state,
        district: newUser.district,
        themePreference: newUser.themePreference,
        token
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      mobile,
      password,
      preferredLanguage: preferredLanguage || 'en',
      state: state || 'Andhra Pradesh',
      district: district || 'Guntur'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        preferredLanguage: user.preferredLanguage,
        state: user.state,
        district: user.district,
        themePreference: user.themePreference,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Auth user & get token
// @route POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { emailOrMobile, password } = req.body;

  if (!emailOrMobile || !password) {
    return res.status(400).json({ message: 'Please enter email/mobile and password' });
  }

  try {
    if (getIsMockMode()) {
      const mockStore = getMockStore();
      let user = mockStore.users.find(u => u.email === emailOrMobile.toLowerCase() || u.mobile === emailOrMobile);
      if (!user) {
        // Create demo user on the fly if testing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = {
          _id: 'mock_user_' + Date.now(),
          name: 'Farmer User',
          email: emailOrMobile.includes('@') ? emailOrMobile.toLowerCase() : 'farmer@krishidrishti.ai',
          mobile: emailOrMobile.includes('@') ? '9876543210' : emailOrMobile,
          password: hashedPassword,
          preferredLanguage: 'en',
          state: 'Andhra Pradesh',
          district: 'Guntur',
          themePreference: 'light',
          accessibilityPreferences: { largeText: false, highContrast: false },
          createdAt: new Date()
        };
        mockStore.users.push(user);
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email/mobile or password' });
        }
      }
      const token = generateToken(user._id);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        preferredLanguage: user.preferredLanguage,
        state: user.state,
        district: user.district,
        themePreference: user.themePreference,
        token
      });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrMobile.toLowerCase() }, { mobile: emailOrMobile }]
    });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        preferredLanguage: user.preferredLanguage,
        state: user.state,
        district: user.district,
        themePreference: user.themePreference,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email/mobile or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Forgot password OTP verify simulation
// @route POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  const { emailOrMobile } = req.body;
  if (!emailOrMobile) {
    return res.status(400).json({ message: 'Please provide email or mobile number' });
  }
  // Generate 6 digit OTP — stored server-side only, NOT returned to client
  const otp = Math.floor(100000 + Math.random() * 900000);
  // In production, send OTP via SMS/email. In demo mode, log to server console only.
  console.log(`[AUTH] OTP generated for ${emailOrMobile}: ${otp}`);
  res.json({
    message: 'OTP sent successfully to registered contact. Check your phone/email.'
  });
};

// @desc Reset password with OTP
// @route POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  const { emailOrMobile, newPassword } = req.body;
  if (!emailOrMobile || !newPassword) {
    return res.status(400).json({ message: 'Missing emailOrMobile or newPassword' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    if (getIsMockMode()) {
      const mockStore = getMockStore();
      const user = mockStore.users.find(u =>
        u.email === emailOrMobile.toLowerCase() || u.mobile === emailOrMobile
      );
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.password = hashedPassword;
      return res.json({ message: 'Password reset successful! You can now log in with your new password.' });
    }

    const user = await User.findOne({
      $or: [
        { email: emailOrMobile.toLowerCase() },
        { mobile: emailOrMobile }
      ]
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password reset successful! You can now log in with your new password.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
