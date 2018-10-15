const UserInfo = require('../../db/models/userInfo.model');

// const USERS_INFO_TABLE = 'users_info';

/* DIRECTRLY USING KNEX QUERY BUILDER */

// const getUserInfoById = (userId) => {
//   return UserInfo.query()
//     .select(
//       'user_id as userId',
//       'nickname',
//       'profile_picture as profilePicture',
//       'biography',
//       'gender',
//       'date_of_birth as dateOfBirth',
//     )
//     .from(USERS_INFO_TABLE)
//     .where('user_id', userId)
//     .then(rows => rows[0]);
// };

/* USING BOOKSHELF ORM */

const getUserInfoById = (userId) => {
  return UserInfo.forge() // .forge() equivalent to new UserInfo()
    .where({user_id: userId})
    .fetch({
      columns: [
        'user_id as userId',
        'nickname',
        'profile_picture as profilePicture',
        'biography',
        'gender',
        'date_of_birth as dateOfBirth',
      ],
    });
  };

module.exports = {
  getUserInfoById,
};