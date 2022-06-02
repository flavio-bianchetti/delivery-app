const bcrypt = require('bcryptjs');

const generate = (password) => bcrypt.hashSync(password, 10);

const verify = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  generate,
  verify,
};
