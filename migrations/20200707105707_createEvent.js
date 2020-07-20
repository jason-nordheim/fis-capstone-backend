
const TABLE_NAME = 'event'

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary()
    table.timestamps(true, true) 
    table.integer('creator').references('id').inTable('user')
    table.datetime("start", { precision: 6 });
    table.datetime("end", { precision: 6 });
    table.string('title')
    table.string('description')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
};
