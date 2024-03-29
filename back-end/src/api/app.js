const express = require('express');
require('express-async-errors');
require('dotenv').config();
const path = require('path');
const { errorHandler } = require('../middlewares');
const { 
  LoginRoutes, 
  RegisterRoutes, 
  ProductRoutes,
  SaleRoutes,
  UserRoutes,
} = require('../routes');

const app = express();

app.use(express.json());

app.use('/login', LoginRoutes);
app.use('/register', RegisterRoutes);
app.use('/products', ProductRoutes);
app.use('/sales', SaleRoutes);
app.use('/users', UserRoutes);
app.use('/images', express.static(path.join('public', 'images')));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandler);

module.exports = app;
