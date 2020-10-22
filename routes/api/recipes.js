const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");

router.route("/find")
  .post(recipesController.findAll);

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