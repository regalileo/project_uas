// filepath: /c:/Users/Regal Nugraha/insurance/models/policy-model.js
const db = require('../config/db');

const createPolicy = async (data) => {
    const { policy_number, policy_type, premium, start_date, end_date, user_id } = data;

    if (!policy_number || !policy_type || !premium || !start_date || !end_date || !user_id) {
        return { error: "policy_number, policy_type, premium, start_date, end_date, and user_id are required" };
    }

    try {
        // Periksa apakah user_id ada di tabel users
        const [users] = await db.query("SELECT id FROM users WHERE id = ?", [user_id]);
        if (users.length === 0) {
            return { error: "User ID not found" };
        }

        // Masukkan data ke tabel policies
        const [result] = await db.query(
            "INSERT INTO policies (policy_number, policy_type, premium, start_date, end_date, user_id) VALUES (?, ?, ?, ?, ?, ?)",
            [policy_number, policy_type, premium, start_date, end_date, user_id]
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

const getAllPolicies = async () => {
    try {
        const [policies] = await db.query('SELECT * FROM policies');
        return policies;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getPolicyById = async (id) => {
    try {
        const [policies] = await db.query('SELECT * FROM policies WHERE id = ?', [id]);
        return policies[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updatePolicy = async (id, data) => {
    const { policy_number, policy_type, premium, start_date, end_date, user_id } = data;

    if (!policy_number || !policy_type || !premium || !start_date || !end_date || !user_id) {
        return { error: "policy_number, policy_type, premium, start_date, end_date, and user_id are required" };
    }

    try {
        const [result] = await db.query(
            "UPDATE policies SET policy_number = ?, policy_type = ?, premium = ?, start_date = ?, end_date = ?, user_id = ? WHERE id = ?",
            [policy_number, policy_type, premium, start_date, end_date, user_id, id]
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

const deletePolicy = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM policies WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

module.exports = {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy
};