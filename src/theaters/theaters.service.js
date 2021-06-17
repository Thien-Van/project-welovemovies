const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .then((data) => {
      const reduceMovies = reduceProperties("theater_id", {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        rating: ["movies", null, "rating"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        is_showing: ["movies", null, "is_showing"],
      });
      const reformattedTheaters = reduceMovies(data);
      return reformattedTheaters;
    });
}

function filteredList(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id")
    .where("mt.movie_id", movieId);
}

module.exports = {
  list,
  filteredList,
};
