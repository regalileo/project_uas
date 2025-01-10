// filepath: /c:/Users/Regal Nugraha/insurance/controllers/claim-controller.js
const claimModel = require('../models/claim-model');

const createClaim = async (req, res) => {
    const data = req.body;

    try {
        const result = await claimModel.createClaim(data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json({ message: 'Claim created successfully', claimId: result.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllClaims = async (req, res) => {
    try {
        const claims = await claimModel.getAllClaims();
        res.status(200).json(claims);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getClaimById = async (req, res) => {
    const { id } = req.params;

    try {
        const claim = await claimModel.getClaimById(id);
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        res.status(200).json(claim);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateClaim = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const result = await claimModel.updateClaim(id, data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Claim updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteClaim = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await claimModel.deleteClaim(id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Claim deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getClaimStatistics = async (req, res) => {
    try {
        const statistics = await claimModel.getClaimStatistics();
        res.status(200).json(statistics);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createClaim,
    getAllClaims,
    getClaimById,
    updateClaim,
    deleteClaim,
    getClaimStatistics
};