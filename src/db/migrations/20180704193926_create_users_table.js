exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('user_id').primary();
    t.string('email').notNullable().unique();
    t.string('password').notNullable();
    t.string('refresh_token');
    t.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};
