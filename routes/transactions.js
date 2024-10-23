const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactions');

router.post('/transactions', (req, res) => {
    transactionModel.addTransaction(req.body, (err, result) => {
        if (err) return res.status(400).json({ error: 'Failed to add transaction' });
        res.status(201).json(result);
    });
});

router.get('/transactions', (req, res) => {
    transactionModel.getTransactions((err, rows) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve transactions' });
        res.status(200).json(rows);
    });
});

router.get('/transactions/:id', (req, res) => {
    transactionModel.getTransactionById(req.params.id, (err, row) => {
        if (err || !row) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(row);
    });
});

router.put('/transactions/:id', (req, res) => {
    transactionModel.updateTransaction(req.params.id, req.body, (err) => {
        if (err) return res.status(400).json({ error: 'Failed to update transaction' });
        res.status(200).json({ message: 'Transaction updated' });
    });
});

router.delete('/transactions/:id', (req, res) => {
    transactionModel.deleteTransaction(req.params.id, (err) => {
        if (err) return res.status(404).json({ error: 'Transaction not found' });
        res.status(204).send();
    });
});

router.get('/summary', (req, res) => {
    transactionModel.getSummary((err, summary) => {
        if (err) return res.status(500).json({ error: 'Failed to get summary' });
        res.status(200).json(summary);
    });
});

module.exports = router;
