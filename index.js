const express = require('express');
const app = express();
const transactionRoutes = require('./routes/transactions');
app.use(express.json());
app.use('/api', transactionRoutes);

app.listen(3004, () => console.log('Server running on port 3004'));
