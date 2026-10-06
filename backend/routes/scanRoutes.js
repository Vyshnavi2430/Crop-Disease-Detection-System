const express = require('express');
const router = express.Router();
const { saveScanReport, getScanHistory, deleteScanReport, getScanById } = require('../controllers/scanController');
const { protect } = require('../middleware/authMiddleware');

router.post('/save', protect, saveScanReport);
router.get('/history', protect, getScanHistory);
router.get('/:id', protect, getScanById);
router.delete('/:id', protect, deleteScanReport);

module.exports = router;
