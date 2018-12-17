const express = require('express');
const track = require('./track');
const { logger } = require('../utils/errors');

// Group all track endpoints here, they can be imported with just one router in
// the main server.js file.
const router = express.Router();

router.use('/', track);

router.get('/', (req, res) => {
  res.send('Man page coming soon...');
});

// Handle any error inside the endpoints.
router.use((err, req, res, next) => logger(err, res));

module.exports = router;
