const { getMarketPrices, getMarketLocations } = require('../services/marketService');

// @desc Get agricultural market prices
// @route GET /api/market
exports.getMarketData = async (req, res) => {
  try {
    const { state, district, market, crop } = req.query;
    const prices = getMarketPrices(state, district, market, crop);
    res.json({
      count: prices.length,
      lastUpdated: new Date().toLocaleDateString(),
      data: prices
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get state, district, mandi options
// @route GET /api/market/locations
exports.getMarketLocationsData = async (req, res) => {
  try {
    const locations = getMarketLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
