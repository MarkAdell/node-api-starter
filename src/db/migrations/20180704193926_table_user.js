/* eslint prefer-arrow-callback: 0 */

exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('email')
      .notNullable()
      .unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
