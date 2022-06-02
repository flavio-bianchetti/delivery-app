const { User } = require('../database/models');
const tokenGenerator = require('../utils/auth/tokenGenerator');
// const { validateUserSchema } = require('../util/validateSchema');

const create = async ({ name, email, password, role }) => {
  try {
    // const { error } = validateUserSchema.validate({ displayName, email, password, image });

    // if (error) return { status: 400, message: error.details[0].message };

    const user = await User.findOne({ where: { email } || { name } });
    if (user.length) return false;

    const createdUser = await User.create({ name, email, password, role });

    return {
      user: {
        id: createdUser.id,
        name,
        email,
        role,
      },
      token: tokenGenerator({ name, email, role }),
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

// const getAll = async () => {
//   try {
//     const users = await User.findAll();
//     return users;
//   } catch (err) {
//     console.error(err);
//     return { error: err.message };
//   }
// };

// const find = async (id) => {
//   try {
//     const user = await User.findByPk(Number(id));
//     return user;
//   } catch (err) {
//     console.error(err);
//     return { error: err.message };
//   }
// };

const login = async (email, _password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;
    // validar o password - bcrypt
    // const user = await User.findByPk(Number(id));
    const { name, role } = user;
    return {
      name,
      email,
      role,
      token: tokenGenerator({ name, email, role }),
    };
  } catch (err) {
    console.error(err);
    return null;
  }
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
};
