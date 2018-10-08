const knex = require('../../config/knex.js');

const USERS_TABLE = 'users';
const USERS_INFO_TABLE = 'users_info';

const getOneUserByCustomColumn = (column, value) => {
  return knex
    .select(
      'password',
      'user_id as userId',
    )
    .from(USERS_TABLE)
    .where(column, value)
    .then(rows => rows[0]);
};

const updateRefreshToken = (userId, refreshToken) => {
  return knex(USERS_TABLE)
    .update({
      refresh_token: refreshToken,
    })
    .where('user_id', userId);
};

const saveUser = (userObj) => {
  return knex
    .insert({
      email: userObj.email,
      password: userObj.password,
    })
    .into(USERS_TABLE)
    .returning('user_id')
    .then(rows => rows[0]);
};

const saveUserInfo = (userId, userObj) => {
  return knex
    .insert({
      user_id: userId,
      nickname: userObj.nickname,
    })
    .into(USERS_INFO_TABLE);
};

module.exports = {
  getOneUserByCustomColumn,
  updateRefreshToken,
  saveUser,
  saveUserInfo,
};
