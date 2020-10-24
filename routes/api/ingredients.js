const router = require("express").Router();
const ingredientsController = require("../../controllers/ingredientsController");

router.route("/").get(ingredientsController.findAll);

module.exports = router;
