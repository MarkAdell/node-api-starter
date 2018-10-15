const User = require('../../db/models/user.model');
const UserInfo = require('../../db/models/userInfo.model');

const USERS_TABLE = 'users';
const USERS_INFO_TABLE = 'users_info';

const getOneUserByCustomColumn = (column, value) => {
  return User.query()
    .select(
      'password',
      'user_id as userId',
    )
    .from(USERS_TABLE)
    .where(column, value)
    .then(rows => rows[0]);
};

const updateRefreshToken = (userId, refreshToken) => {
  return User.query()
    .update({
      refresh_token: refreshToken,
    })
    .where('user_id', userId);
};

const saveUser = (userObj) => {
  return User.query()
    .insert({
      email: userObj.email,
      password: userObj.password,
    })
    .into(USERS_TABLE)
    .returning('user_id')
    .then(rows => rows[0]);
};

const saveUserInfo = (userId, userObj) => {
  return User.query()
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
