const express = require('express');
const { errorHandler } = require('../middlewares');
const { LoginRoutes, RegisterRoutes } = require('../routes');
require('express-async-errors');

const app = express();

app.use(express.json());

app.use('/login', LoginRoutes);
app.use('/register', RegisterRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
