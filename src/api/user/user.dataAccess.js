const knex = require('../../config/knex.js');

const TABLE_NAME = 'users';

const saveUser = (userObj) => {
  return knex
    .insert(userObj)
    .into(TABLE_NAME)
    .returning('*')
    .then(rows => rows[0]);
};

const getUserByID = (userId) => {
  return knex
    .select('*')
    .from(TABLE_NAME)
    .where('id', userId)
    .then(rows => rows[0]);
};

const getUserByEmail = (userEmail) => {
  return knex
    .select('*')
    .from(TABLE_NAME)
    .where('email', userEmail)
    .then(rows => rows[0]);
};

module.exports = {
  getUserByID,
  saveUser,
  getUserByEmail,
};
