exports.up = (knex) => {
  return knex.schema.createTable('users_info', (t) => {
    t.increments('user_info_id').primary();
    t.integer('user_id').unsigned().notNullable();
    t.string('nickname').notNullable();
    t.string('profile_picture').defaultTo('https://bit.ly/1nRvZRB');
    t.boolean('is_admin').defaultTo(false);
    t.boolean('is_deleted').defaultTo(false);
    t.boolean('is_banned').defaultTo(false);
    t.string('gender').defaultTo('Male');
    t.string('biography').defaultTo('');
    t.string('country');
    t.timestamp('date_of_birth');
    t.timestamps(true, true); // created_at, // updated_at
    t.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users_info');
};
