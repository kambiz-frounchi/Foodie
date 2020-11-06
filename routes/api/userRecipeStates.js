const router = require("express").Router();
const userRecipeStateController = require("../../controllers/userRecipeStatesController");

router.route("/:id").get(userRecipeStateController.find);

router.route("/").post(userRecipeStateController.create);

module.exports = router;