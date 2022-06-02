const { Router } = require('express');
const cors = require('cors');
const UserController = require('../controllers/userController');
const { registerValidations } = require('../middlewares');
// import { ValidateJWTMiddleware, ValidateRoutesEntries } from '../middlewares';

const routes = Router();

routes.use(cors());

routes.post('/', registerValidations, UserController.create);

// routes.post(
//   '/create',
//   ValidateRoutesEntries.validateCreateUser,
//   UserController.create
// );

// routes.post(
//   '/todolist',
//   ValidateRoutesEntries.validateCreateTodoTask,
//   ValidateJWTMiddleware.validate,
//   TodoController.create,
// );
// routes.get(
//   '/todolist/:id',
//   ValidateRoutesEntries.validateParamId,
//   ValidateJWTMiddleware.validate,
//   TodoController.findAll,
// );
// routes.put(
//   '/todolist/task/:id',
//   ValidateRoutesEntries.validateParamId,
//   ValidateRoutesEntries.validateUpdateTodoTask,
//   ValidateJWTMiddleware.validate,
//   TodoController.update,
// );
// routes.delete(
//   '/todolist/task/:id',
//   ValidateRoutesEntries.validateParamId,
//   ValidateJWTMiddleware.validate,
//   TodoController.delete,
// );

module.exports = routes;
