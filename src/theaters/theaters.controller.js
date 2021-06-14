const service = require("./theaters.service");

async function list(req, res, next) {
  const theaters = await service.list();
  res.json(theaters);
}

module.exports = {
  list,
};
