const db = require('../config/db');
const bcrypt = require('bcrypt');

const register = async (data) => {
    const {username, email, phone, password, role} = data

    if(!username || !email || !phone || !password || !role) {
        return {error: "username, email, phone, password and role is required"};
    }
    try {
        const salt = 10
        const hash = await bcrypt.hash(password, salt)
        const {result} =
        await db.query ("insert into users (username, email, phone, password, role) values (?, ?, ?, ?, ?)", [username, email, phone, hash, role])
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
        const [users] = await db.query("select * from users where username = ?", [username])
        if(users.length === 0) {
            return {error: "User not found"};
        }
        const user = users[0]
        const match = await bcrypt.compare(password, user.password)
        if(!match) {
            return {error: "Password is wrong"};
        }
        return user;
    } 
    catch (error) {
        console.log(error);
        return {error: "Database Error"};
    }
}

const getAllUsers = async () => {
    const [users] = await db.query('select * from users');
    return users;
}

const getUserById = async (id) => {
    const [users] = await db.query('select * from users where id = ?', [id]);
    return users[0];
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
        return {error: "Database Error"};
    }
}
module.exports = {register, login, getAllUsers, getUserById, updateUser}