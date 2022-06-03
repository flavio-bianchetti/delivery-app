const registerSchema = require('../schemas/registerSchema');

const registerValidate = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    const [status, message] = error.message.split('|');
    return res.status(+status).json({ message });
  }

  next();
};

module.exports = registerValidate;