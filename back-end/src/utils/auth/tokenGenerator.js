const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../readJwtFile');

module.exports = (data) => {
  const SECRET = JWT_SECRET || 'secret';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data }, SECRET, jwtConfig);
  return token;
};
