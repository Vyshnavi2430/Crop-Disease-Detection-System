const User = require('../models/User');
const { getIsMockMode, getMockStore } = require('../config/db');

// @desc Get user profile
// @route GET /api/user/profile
exports.getUserProfile = async (req, res) => {
  try {
    if (getIsMockMode()) {
      return res.json(req.user);
    }
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update user profile
// @route PUT /api/user/profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, preferredLanguage, state, district, themePreference, accessibilityPreferences, profilePhoto } = req.body;

    if (getIsMockMode()) {
      const mockStore = getMockStore();
      const user = mockStore.users.find(u => u._id.toString() === req.user._id.toString()) || req.user;
      if (name) user.name = name;
      if (preferredLanguage) user.preferredLanguage = preferredLanguage;
      if (state) user.state = state;
      if (district) user.district = district;
      if (themePreference) user.themePreference = themePreference;
      if (accessibilityPreferences) user.accessibilityPreferences = accessibilityPreferences;
      if (profilePhoto) user.profilePhoto = profilePhoto;

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        preferredLanguage: user.preferredLanguage,
        state: user.state,
        district: user.district,
        themePreference: user.themePreference,
        accessibilityPreferences: user.accessibilityPreferences
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (preferredLanguage) user.preferredLanguage = preferredLanguage;
    if (state) user.state = state;
    if (district) user.district = district;
    if (themePreference) user.themePreference = themePreference;
    if (accessibilityPreferences) user.accessibilityPreferences = accessibilityPreferences;
    if (profilePhoto) user.profilePhoto = profilePhoto;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      preferredLanguage: updatedUser.preferredLanguage,
      state: updatedUser.state,
      district: updatedUser.district,
      themePreference: updatedUser.themePreference,
      accessibilityPreferences: updatedUser.accessibilityPreferences
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
