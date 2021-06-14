const service = require("./movies.service");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  console.log(req.params);
  const [movie] = await service.read(movieId);
  console.log("movie", movie);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: "Movie cannot be found." });
}

async function read(req, res, next) {
  const movie = res.locals.movie;
  console.log("found", movie);
  res.json({ movie });
}

async function list(req, res, next) {
  const is_showing = req.query.is_showing;
  const data = await service.list(is_showing);
  res.json({ data });
}

module.exports = {
  read: [movieExists, read],
  list,
};
