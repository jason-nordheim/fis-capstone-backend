const TABLE_NAME = "user";

exports.up = function (knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.timestamps("created_at", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.string("username");
    table.string("password_digest");
    table.string("first", 100);
    table.string("last", 100);
    table.string("email", 200); 
    table.text("bio");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME);
};
