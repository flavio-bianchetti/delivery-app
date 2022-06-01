const bcrypt = require('bcryptjs');

const generate = (password) => {
    return bcrypt.hashSync(password, 10);
  };

const verify = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  };

module.exports = {
  generate,
  verify,
};
