const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");
const isAuthenticated = require("../../passport/isAuthenticated");

router.route("/find")
  .post(recipesController.find);

router.route("/")
  .get(recipesController.findAll)
  .post(recipesController.create);

// Matches with "/api/recipes"
//router.route("/")
//.get(recipesController.findAll)
//.post(recipesController.create);

// Matches with "/api/recipes/:id"
//router
//  .route("/:id")
//.get(recipesController.findById)
//.put(recipesController.update)
//.delete(recipesController.remove);

module.exports = router;
