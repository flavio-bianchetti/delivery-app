const { Router } = require('express');
const cors = require('cors');
const SaleController = require('../controllers/salesController');

const routes = Router();

routes.use(cors());

routes.get('/', SaleController.getAll);
routes.post('/', SaleController.create);
routes.get('/:id', SaleController.getById);
routes.get('/user/:id', SaleController.getByUserId);
routes.put('/:id', SaleController.updateStatus);

module.exports = routes;