// routes/weather-routes.js

const express = require('express');
const { getCurrentWeather } = require('../controllers/currentWeather-controller');
const router = express.Router();

// Rute untuk mendapatkan cuaca saat ini berdasarkan nama kota
router.get('/current-weather', getCurrentWeather);

module.exports = router;
