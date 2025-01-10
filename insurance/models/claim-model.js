// filepath: /c:/Users/Regal Nugraha/insurance/models/claim-model.js
const db = require('../config/db');

const createClaim = async (data) => {
    const { policy_id, claim_amount, claim_date, status } = data;

    if (!policy_id || !claim_amount || !claim_date || !status) {
        return { error: "policy_id, claim_amount, claim_date, and status are required" };
    }

    try {
        // Periksa apakah policy_id ada di tabel policies
        const [policies] = await db.query("SELECT id FROM policies WHERE id = ?", [policy_id]);
        if (policies.length === 0) {
            return { error: "Policy ID not found" };
        }

        // Masukkan data ke tabel claims
        const [result] = await db.query(
            "INSERT INTO claims (policy_id, claim_amount, claim_date, status) VALUES (?, ?, ?, ?)",
            [policy_id, claim_amount, claim_date, status]
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

const getAllClaims = async () => {
    try {
        const [claims] = await db.query('SELECT * FROM claims');
        return claims;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getClaimById = async (id) => {
    try {
        const [claims] = await db.query('SELECT * FROM claims WHERE id = ?', [id]);
        return claims[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateClaim = async (id, data) => {
    const { policy_id, claim_amount, claim_date, status } = data;

    if (!policy_id || !claim_amount || !claim_date || !status) {
        return { error: "policy_id, claim_amount, claim_date, and status are required" };
    }

    try {
        const [result] = await db.query(
            "UPDATE claims SET policy_id = ?, claim_amount = ?, claim_date = ?, status = ? WHERE id = ?",
            [policy_id, claim_amount, claim_date, status, id]
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

const deleteClaim = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM claims WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

const getclaimStatistics = async () => {
    try {
        const [statistics] = await db.query(`
            SELECT 
                status, 
                COUNT(*) as count, 
                SUM(claim_amount) as total_amount 
            FROM claims 
            GROUP BY status
        `);
        return statistics;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

module.exports = {
    createClaim,
    getAllClaims,
    getClaimById,
    updateClaim,
    deleteClaim,
    getclaimStatistics
};