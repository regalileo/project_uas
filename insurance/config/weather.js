require('dotenv').config()
const axios = require('axios')

const weatherAPI = axios.create({
    baseURL: "https://www.weatherapi.com/v1",
    headers:{
        Accept:'aplication/json',
        Authorization : `Bearer${process.env.WEATHER_BEARER}`
    }
})

module.exports = weatherAPI