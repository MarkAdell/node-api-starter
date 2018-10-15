const bookshelf = require('./../../config/bookshelf.js');
require('./userInfo.model.js');

bookshelf.plugin('registry');

const User = bookshelf.Model.extend({
  tableName: 'users',
  usersInfo: function () {
    return this.hasOne('UserInfo');
  }
});

module.exports = bookshelf.model('User', User);

