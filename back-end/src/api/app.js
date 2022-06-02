const express = require('express');
require('express-async-errors');
require('dotenv').config();
const { errorHandler } = require('../middlewares');
const { LoginRoutes, RegisterRoutes } = require('../routes');

const app = express();

app.use(express.json());

app.use('/login', LoginRoutes);
app.use('/register', RegisterRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
