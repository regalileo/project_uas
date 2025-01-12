const policyModel = require('../models/policy-model');

const createPolicy = async (req, res) => {
    const data = req.body;

    try {
        const result = await policyModel.createPolicy(data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json({ message: 'Policy created successfully', policyId: result.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllPolicies = async (req, res) => {
    try {
        const policies = await policyModel.getAllPolicies();
        res.status(200).json(policies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPolicyById = async (req, res) => {
    const { id } = req.params;

    try {
        const policy = await policyModel.getPolicyById(id);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found' });
        }

        res.status(200).json(policy);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePolicy = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const result = await policyModel.updatePolicy(id, data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Policy updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePolicy = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await policyModel.deletePolicy(id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Policy deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy
};