// controllers/weather-controller.js

const axios = require('axios');
const parseWeather = require('../models/currentWeather-model');

// Gantilah 'YOUR_API_KEY' dengan API key Anda dari WeatherAPI.com
const API_KEY = '9f4ae46f8b3a494f92a71150251201';
const BASE_URL = 'http://api.weatherapi.com/v1';

/**
 * Mendapatkan cuaca saat ini berdasarkan nama kota.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 */
const getCurrentWeather = async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ message: 'Parameter "city" diperlukan.' });
    }

    try {
        const response = await axios.get(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: city
            }
        });

        const weather = parseWeather(response.data);
        res.status(200).json(weather);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data cuaca.' });
    }
};

module.exports = { getCurrentWeather };
