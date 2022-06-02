const userLogin = require('../schemas/userLogin');

const loginValidation = async (req, res, next) => {
  const { error } = userLogin.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(+code).json({ message });
  }

  next();
};

module.exports = loginValidation;