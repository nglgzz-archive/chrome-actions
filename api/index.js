const express = require('express');
const track = require('./track');
const { logger } = require('../utils/errors');

// Group all track endpoints here, so we can import and use them with just one
// router in the main index.js file.
const router = express.Router();


router.use('/track', track);


// Handle any error inside the endpoints.
router.use((err, req, res, next) => logger(err, res));

module.exports = router;
