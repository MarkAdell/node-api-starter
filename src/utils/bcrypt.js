const bcrypt = require('bcrypt');

const hash = (value) => {
  return bcrypt.hash(value, 10);
};

const compare = (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};

module.exports = {
  hash,
  compare,
};
