const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Route to fetch data from a third-party API
router.get('/data', apiController.fetchDataFromAPI);

module.exports = router;
