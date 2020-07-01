

const TABLE_NAME = 'follower'

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table.timestamps("created_at", { precision: 6 })
    table.integer("requestee_id").references("id").inTable('user');
    table.integer("requestor_id").references("id").inTable("user");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
