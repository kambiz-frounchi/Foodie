const router = require("express").Router();
const cuisinesController = require("../../controllers/cuisinesController");

router.route("/").get(cuisinesController.findAll);

module.exports = router;
