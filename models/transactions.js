const db = require('../db/database');

exports.addTransaction = (data, callback) => {
    const query = 'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [data.type, data.category, data.amount, data.date, data.description], function (err) {
        callback(err, { id: this.lastID });
    });
};

exports.getTransactions = (callback) => {
    const query = 'SELECT * FROM transactions';
    db.all(query, [], (err, rows) => callback(err, rows));
};

exports.getTransactionById = (id, callback) => {
    const query = 'SELECT * FROM transactions WHERE id = ?';
    db.get(query, [id], (err, row) => callback(err, row));
};

exports.updateTransaction = (id, data, callback) => {
    const query = 'UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?';
    db.run(query, [data.type, data.category, data.amount, data.date, data.description, id], (err) => callback(err));
};

exports.deleteTransaction = (id, callback) => {
    const query = 'DELETE FROM transactions WHERE id = ?';
    db.run(query, [id], (err) => callback(err));
};

exports.getSummary = (callback) => {
    const incomeQuery = 'SELECT SUM(amount) AS totalIncome FROM transactions WHERE type = "income"';
    const expenseQuery = 'SELECT SUM(amount) AS totalExpense FROM transactions WHERE type = "expense"';
    db.get(incomeQuery, [], (err, incomeResult) => {
        db.get(expenseQuery, [], (err, expenseResult) => {
            const totalIncome = incomeResult ? incomeResult.totalIncome : 0;
            const totalExpense = expenseResult ? expenseResult.totalExpense : 0;
            callback(err, { totalIncome, totalExpense, balance: totalIncome - totalExpense });
        });
    });
};
