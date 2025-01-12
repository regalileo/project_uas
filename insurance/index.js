const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const logger = require('./middlewares/logger');
const userRoutes = require('./routes/user-routes');
const policyRoutes = require('./routes/policy-routes');
const claimRoutes = require('./routes/claim-routes');
const paymentRoutes = require('./routes/payment-routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(logger);

app.use('/api/users', userRoutes);
app.use('/api/pclicies', policyRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})