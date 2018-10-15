const bookshelf = require('./../../config/bookshelf.js');
require('./userInfo.model.js');

bookshelf.plugin('registry');

const UserInfo = bookshelf.Model.extend({
  tableName: 'users_info',
  users: function () {
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('UserInfo', UserInfo);

