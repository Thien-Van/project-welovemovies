const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
