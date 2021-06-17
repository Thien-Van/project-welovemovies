const service = require("./theaters.service");

async function list(req, res, next) {
  const { movieId } = req.params;
  if (movieId) {
    const theatersMovie = await service.filteredList(movieId);
    if (theatersMovie.length > 0) {
      res.json({ data: theatersMovie });
    } else {
      return next({ status: 404, message: "Movie cannot be found." });
    }
  } else {
    const theaters = await service.list();
    res.json({ data: theaters });
  }
}

module.exports = {
  list,
};
