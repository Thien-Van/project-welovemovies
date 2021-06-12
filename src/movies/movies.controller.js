const service = require("./movies.service");

async function read(req, res, next) {}

async function list(req, res, next) {
  const is_showing = req.query.is_showing;
  const data = await service.list(is_showing);
  res.json({ data });
}

module.exports = {
  read,
  list,
};
