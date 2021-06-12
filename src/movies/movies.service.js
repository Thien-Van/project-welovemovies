const knex = require("../db/connection");

function list(is_showing) {
  if (is_showing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select(
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url"
      )
      .where({ is_showing: true })
      .groupBy("m.movie_id")
      .orderBy("m.movie_id");
  }
  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies").select("*").where({ id: movieId });
}

module.exports = {
  list,
  read,
};
