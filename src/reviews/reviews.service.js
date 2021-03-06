const knex = require("../db/connection");

function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
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

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId });
}

function update(updatedReview, reviewId) {
  console.log("updatedReview received from controller", updatedReview);
  return knex("reviews")
    .where({ review_id: reviewId })
    .update(updatedReview, "*")
    .then(([data]) => {
      console.log("after then data", data);
      return knex("critics")
        .select("*")
        .where({ critic_id: data.critic_id })
        .then(([critic]) => {
          const combinedData = {
            ...data,
            critic,
          };
          return combinedData;
        });
    });
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  list,
  read,
  update,
  delete: destroy,
};
