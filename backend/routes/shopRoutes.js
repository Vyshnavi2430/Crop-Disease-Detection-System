const express = require('express');
const router = express.Router();
const { getNearbyShops } = require('../controllers/shopController');

router.get('/', getNearbyShops);

module.exports = router;
