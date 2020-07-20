

const TABLE_NAME = 'follower'

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table.timestamps(true, true) 
    table.integer("requestee_id").references("id").inTable('user');
    table.integer("requestor_id").references("id").inTable("user");
    table.boolean('accepted').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
