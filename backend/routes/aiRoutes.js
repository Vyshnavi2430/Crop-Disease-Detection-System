const express = require('express');
const router = express.Router();

const {
  translateText,
  analyzeCrop,
  chatAssistant
} = require('../controllers/aiController');

const upload = require('../middleware/uploadMiddleware');

router.post('/translate', translateText);

router.post(
  '/analyze-crop',
  upload.single('cropImage'),
  analyzeCrop
);

router.post('/chat', chatAssistant);

module.exports = router;