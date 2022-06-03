const { Router } = require('express');
const cors = require('cors');
const ProductController = require('../controllers/productController');

const routes = Router();

routes.use(cors());

routes.get('/', ProductController.getAll);

module.exports = routes;
