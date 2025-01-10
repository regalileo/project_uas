const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const data = req.body;

    try {
        const addUser = await userModel.register(data);
        if(addUser){
            return res.status(200).json({id: addUser.id, hash: addUser.pass })
        }
        return res.status(400).send({msg: "error Registration"})

    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const data = req.body;

    try {
        const user = await userModel.login(data);
        if(user.error){
            return res.status(400).json({msg: user.error})
        }
        const token = jwt.sign({id: user.id, role: user.role}, 'secretkey');
        return res.status(200).json({token: token})
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userModel.getUserById(id);
        if(user){
            return res.status(200).json(user);
        }
        return res.status(400).json({msg: "User not found"});
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const user = await userModel.updateUser(id, data);
        if(user){
            return res.status(200).json({msg: "User updated"});
        }
        return res.status(400).json({msg: "User not found"});
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userModel.deleteUser(id);
        if(user){
            return res.status(200).json({msg: "User deleted"});
        }
        return res.status(400).json({msg: "User not found"});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {register, login, getAllUsers, getUserById, updateUser , deleteUser}