const knex = require('../../config/knex.js');

const USERS_INFO_TABLE = 'users_info';

const getUserInfoById = (userId) => {
  return knex
    .select(
      'user_id as userId',
      'nickname',
      'profile_picture as profilePicture',
      'biography',
      'gender',
      'date_of_birth as dateOfBirth',
    )
    .from(USERS_INFO_TABLE)
    .where('user_id', userId)
    .then(rows => rows[0]);
};

module.exports = {
  getUserInfoById,
};
