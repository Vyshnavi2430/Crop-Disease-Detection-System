const {
  getWeatherForLocation
} = require('../services/weatherService');

// @desc Get real weather & agricultural information
// @route GET /api/weather
exports.getWeather = async (req, res) => {
  try {
    const {
      state,
      district,
      lat,
      lng
    } = req.query;

    const userState =
      state ||
      (req.user && req.user.state) ||
      '';

    const userDistrict =
      district ||
      (req.user && req.user.district) ||
      '';

    if (!userState && !userDistrict && (lat === undefined || lng === undefined || lat === '' || lng === '')) {
      return res.json(null);
    }

    const weatherData = await getWeatherForLocation(
      userState,
      userDistrict,
      lat,
      lng
    );

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);

    res.status(500).json({
      message:
        error.message ||
        'Unable to fetch weather data.'
    });
  }
};