const service = require("./reviews.service");

async function list(req, res, next) {
  const { movieId } = req.params;
  console.log("movie is", movieId);

  if (movieId) {
    console.log("movie is", movieId);
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

module.exports = {
  list,
};
