const knex = require('../config/knex.js');

const startTransaction = () => {
  return new Promise((resolve) => {
    return knex.transaction(resolve);
  });
};

module.exports = {
  startTransaction,
};
