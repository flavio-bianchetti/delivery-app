const md5 = require('md5');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const tokenGenerator = require('../utils/auth/tokenGenerator');

const create = async ({ name, email, password, role }) => {
  const user = await User.findOne({ where: { [Op.or]: [{ email }, { name }] } });
  if (user) return false;

  const hashedPassword = crypto.createHash('md5').update(password).digest('hex'); 
  const createdUser = await User.create({ name, email, password: hashedPassword, role });

  return {
    user: {
      id: createdUser.id,
      name,
      email,
      role,
    },
    token: tokenGenerator({ name, email, role }),
  };
};

const getByRole = async (role) => {
  try {
    const users = await User.findAll({ where: { role } });
    return users;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const getByUserId = async (id) => {
  try {
    const users = await User.findByPk({ where: { id } });
    return users;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return false;

  if (md5(password) !== user.password) {
    return { code: 404, message: 'Incorrect password' };
  }

  const { name, role, id } = user;

  return {
    id,
    name,
    email,
    role,
    token: tokenGenerator({ name, email, role }),
  };
};

// const exclude = async (id) => {
//   try {
//     const user = await User.findByPk(Number(id));
//     if (!user) return { status: 404, message: 'User not found' };

//     await User.destroy({ where: { id } });
//     return true;
//   } catch (err) {
//     console.error(err);
//     return { error: err.message };
//   }
// };

module.exports = {
  create,
  login,
  getByRole,
  getByUserId,
};
