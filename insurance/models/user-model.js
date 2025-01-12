const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (data) => {
    const {username, email, phone, password} = data

    if(!username || !email || !phone || !password) {
        return {error: "username, email, phone, password is required"};
    }
    try {
        const salt = 10
        const hash = await bcrypt.hash(password, salt)
        const {result} =
        await db.query ("insert into users (username, email, phone, password) values (?, ?, ?, ?)", [username, email, phone, hash])
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
    try{
        const [users] = await db.query('select * from users where id = ?', [id]);
        return users;
    }catch (error){
        console.log(error);
    }   
}

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