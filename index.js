const express = require('express');
const app = express();
const transactionRoutes = require('./routes/transactions');
app.use(express.json());
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
