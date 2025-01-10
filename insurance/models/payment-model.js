// filepath: /c:/Users/Regal Nugraha/insurance/models/payment-model.js
const db = require('../config/db');

const createPayment = async (data) => {
    const { policy_id, amount, payment_date, payment_method } = data;

    if (!policy_id || !amount || !payment_date || !payment_method) {
        return { error: "policy_id, amount, payment_date, and payment_method are required" };
    }

    try {
        // Periksa apakah policy_id ada di tabel policies
        const [policies] = await db.query("SELECT id FROM policies WHERE id = ?", [policy_id]);
        if (policies.length === 0) {
            return { error: "Policy ID not found" };
        }

        // Masukkan data ke tabel payments
        const [result] = await db.query(
            "INSERT INTO payments (policy_id, amount, payment_date, payment_method) VALUES (?, ?, ?, ?)",
            [policy_id, amount, payment_date, payment_method]
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

const getAllPayments = async () => {
    try {
        const [payments] = await db.query('SELECT * FROM payments');
        return payments;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getPaymentById = async (id) => {
    try {
        const [payments] = await db.query('SELECT * FROM payments WHERE id = ?', [id]);
        return payments[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updatePayment = async (id, data) => {
    const { policy_id, amount, payment_date, payment_method } = data;

    if (!policy_id || !amount || !payment_date || !payment_method) {
        return { error: "policy_id, amount, payment_date, and payment_method are required" };
    }

    try {
        const [result] = await db.query(
            "UPDATE payments SET policy_id = ?, amount = ?, payment_date = ?, payment_method = ? WHERE id = ?",
            [policy_id, amount, payment_date, payment_method, id]
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

const deletePayment = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM payments WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};


module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};