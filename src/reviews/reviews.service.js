const knex = require("../db/connection");

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.* as critic")
    .where("r.movie_id", movieId)
    .then((data) => {
      const restructuredData = data.map((review) => {
        const critic = {
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
        };
        const { review_id, content, score, critic_id, movie_id } = review;
        return {
          review_id,
          content,
          score,
          critic_id,
          movie_id,
          critic,
        };
      });
      return restructuredData;
    });
}

module.exports = {
  list,
};
