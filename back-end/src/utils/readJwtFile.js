const { readFileSync } = require('fs');

const JWT_SECRET = readFileSync(`${process.cwd()}/jwt.evaluation.key`, {
  encoding: 'utf8',
  flag: 'r' }).trim();

module.exports = JWT_SECRET;