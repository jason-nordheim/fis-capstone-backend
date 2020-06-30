

const TABLE_NAME = 'follower'

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table.timestamps("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.integer("requestee_id")
    table.integer('requestor_id')
    table.foreign("requestee_id").references("user.id").inTable('user');
    table.foreign("requestor_id").references("user.id").inTable('user')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
