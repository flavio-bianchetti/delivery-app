const { Router } = require('express');
const cors = require('cors');
const SaleController = require('../controllers/salesController');

const routes = Router();

routes.use(cors());

routes.get('/', SaleController.getAll);
routes.get('/:id', SaleController.getById);
routes.put('/:id', SaleController.updateStatus);

module.exports = routes;