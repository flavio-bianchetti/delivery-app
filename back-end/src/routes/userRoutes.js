const { Router } = require('express');
const cors = require('cors');
const UserController = require('../controllers/userController');

const routes = Router();

routes.use(cors());

routes.get('/:id', UserController.getById);
routes.post('/', UserController.getByRole);

module.exports = routes;
