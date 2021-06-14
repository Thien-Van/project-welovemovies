const knex = require("../db/connection");

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*");
}

function filteredList(movieId) {
  console.log("movieId given over", movieId);
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id")
    .where("mt.movie_id", movieId);
}

module.exports = {
  list,
  filteredList,
};
