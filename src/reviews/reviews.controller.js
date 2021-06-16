const service = require("./reviews.service");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const [review] = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: "Review cannot be found." });
}

async function list(req, res, next) {
  const { movieId } = req.params;

  if (movieId) {
    const data = await service.list(movieId);
    if (data) {
      res.json(data);
    } else {
      return next({ status: 404, message: "Movie cannot be found." });
    }
  } else {
    return next();
  }
}

async function update(req, res, next) {
  const { data } = req.body;
  const updatedReview = { ...data };
  const reviewId = res.locals.review.review_id;
  const updatedData = await service.update(updatedReview, reviewId);
  res.json({ updatedData });
}

async function destroy(req, res, next) {
  const reviewId = res.locals.review.review_id;
  await service.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  list,
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
