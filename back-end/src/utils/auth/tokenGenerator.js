const jwt = require('jsonwebtoken');

module.exports = (data) => {
  const SECRET = process.env.JWT_SECRET || 'secret';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data }, SECRET, jwtConfig);
  return token;
};
