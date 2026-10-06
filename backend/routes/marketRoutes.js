const express = require('express');
const router = express.Router();
const { getMarketData, getMarketLocationsData } = require('../controllers/marketController');

router.get('/', getMarketData);
router.get('/locations', getMarketLocationsData);

module.exports = router;
