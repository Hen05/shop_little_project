const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const swaggerOptions = require('./swaggerOptions');
const cookieParser = require('cookie-parser');
const { verifyToken } = require('./src/middlewares/authenticationMiddleware.js');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const authenticationRoutes = require('./src/routes/authenticationRoutes.js');
const itemRoutes = require('./src/routes/itemRoutes.js');
const saleRoutes = require('./src/routes/saleRoutes.js');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(config.DB_URI)
    .then(() => console.log('Connected to MongoDB database'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

app.use('/api/auth', authenticationRoutes);

app.use(verifyToken);

app.use('/api/item', itemRoutes);
app.use('/api/sales', saleRoutes);

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
