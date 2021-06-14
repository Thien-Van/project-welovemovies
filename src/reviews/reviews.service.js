const knex = require("../db/connection");

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.* as critic")
    .where("r.movie_id", movieId);
}

module.exports = {
  list,
};
