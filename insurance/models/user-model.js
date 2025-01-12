const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const axios = require('axios');

const API_KEY = '9f4ae46f8b3a494f92a71150251201';
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

const register = async (data) => {
    const {username, email, phone, password, address} = data

    if(!username || !email || !phone || !password|| !address) {
        return {error: "username, email, phone, password is required"};
    }
    try {
        const salt = 10
        const hash = await bcrypt.hash(password, salt)
        const {result} =
        await db.query ("insert into users (username, email, phone, password, address) values (?, ?, ?, ?, ?)", [username, email, phone, hash, address])
        return ({pass:hash});
    } 
    catch (error) {
        console.log(error);
        return {error: "Database Error"};

    }
}

const login = async (data) => {
    const {username, password} = data

    if(!username || !password) {
        return {error: "username and password is required"};
    }
    try {
        const [result] = await db.query("select * from users where username = ?", [username])
        if(result) {
            const isLogin = await bcrypt.compare(password, result[0].password)
            
            if(isLogin) {
                const payload = {
                    id : result[0].id,
                    username : result[0].username,
                    email: result[0].email,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
            return ({
                id: result[0].id,
                token: token
            });
        }
        return {message: "Invalid username or password"};
    } 
    return {message: "Invalid username or password"};
    }catch (error) {
        console.log(error);
    }
}

const getAllUsers = async () => {
    try{
        const [users] = await db.query('select * from users');
        return users;
    }catch(error){
        console.log(error);
    }
}

const getUserById = async (id) => {
    try {
        // Ambil data user berdasarkan ID
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

        if (!user.length) {
            return null;
        }

        const userData = user[0];

        // Pastikan alamat tersedia sebelum memanggil API cuaca
        if (!userData.address) {
            return { ...userData, weather: null };
        }

        // Panggil API cuaca berdasarkan alamat
        const weatherResponse = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: userData.address,
            },
        });

        // Ambil data cuaca
        const weatherData = weatherResponse.data;

        // Gabungkan data user dengan data cuaca
        return {...userData,weather: {
                location: weatherData.location.name,
                region: weatherData.location.region,
                country: weatherData.location.country,
                temperature: weatherData.current.temp_c,
                condition: weatherData.current.condition.text,
                humidity: weatherData.current.humidity,
                wind_speed: weatherData.current.wind_kph,
                wind_direction: weatherData.current.wind_dir,
                pressure: weatherData.current.pressure_mb,
                feels_like: weatherData.current.feelslike_c,
                last_updated: weatherData.current.last_updated,
            },
        };
    } catch (error) {
        console.error('Error fetching user or weather data:', error.message);
    }
};
const updateUser = async (id, data) => {
    const {username, email, phone, role} = data

    if(!username || !email || !phone || !role) {
        return {error: "username, email, phone and role is required"};
    }
    try {
        await db.query('update users set username = ?, email = ?, phone = ?, role = ? where id = ?', [username, email, phone, role, id]);
        return {id, username, email, phone, role};
    } 
    catch (error) {
        console.log(error);
    }
}
module.exports = {register, login, getAllUsers, getUserById, updateUser}