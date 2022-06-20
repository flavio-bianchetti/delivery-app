// require('dotenv').config();
// const express = require('express');
const UserService = require('../services/userService');
// const validateJWTMiddleware = require('../middlewares/validateJWTMiddleware');

// const router = express.Router();

const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = await UserService.create({ name, email, password, role });

  if (!result) return res.status(409).json({ message: 'User already exists' });

  // if (result.tokenError) return res.status(401).json({ error: result.tokenError });

  // if (result.message) return res.status(result.status).json({ message: result.message });

  return res.status(201).json(result);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await UserService.login(email, password);

  if (!result) return res.status(404).json({ message: 'Not Found' });

  if (result.code) return res.status(result.code).json({ message: result.message });

  return res.status(200).json(result);
};

const getByRole = async (req, res) => {
  try {
    const { role } = req.body;
    const users = await UserService.getByRole(role);
    // if (users.error) return res.status(500).json({ error: users.error });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserService.getByUserId(id);
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};



module.exports = {
  create,
  login,
  getByRole,
  getById,
};
