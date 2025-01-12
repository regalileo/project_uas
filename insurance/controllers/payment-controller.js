const paymentModel = require('../models/payment-model');

const createPayment = async (req, res) => {
    const data = req.body;

    try {
        const result = await paymentModel.createPayment(data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json({ message: 'Payment created successfully', paymentId: result.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await paymentModel.getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await paymentModel.getPaymentById(id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePayment = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const result = await paymentModel.updatePayment(id, data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Payment updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await paymentModel.deletePayment(id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};