const knex = require("../db/connection");

knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies").select("*").where({ id: movieId });
}

module.exports = {
  list,
  read,
};
