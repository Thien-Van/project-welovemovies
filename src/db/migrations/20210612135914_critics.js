exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    knex.increment("critic_id").primary();
    knex.string("preferred_name");
    knex.string("surname");
    knex.string("organization_name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
