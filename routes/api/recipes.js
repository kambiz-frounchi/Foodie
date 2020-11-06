const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");
const isAuthenticated = require("../../passport/isAuthenticated");
const path = require("path");

router.route("/find").post(recipesController.find);

router.route("/").get(recipesController.findAll).post(recipesController.create);

router.route("/:id").get(recipesController.getRecipe);

router.route("/images/:id").get(recipesController.getImage);

router.route("/like/:id").post(recipesController.updateLikeCount);

router.route("/user/:id").get(recipesController.findByUser);

router.route("/upload").post((req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log(req.files);
  const recipeImageFile = req.files.myimage;
  recipeImageFile.mv(
    path.join(__dirname, "../../images/", recipeImageFile.name),
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    }
  );
  res.status(200).send("file received");
});

module.exports = router;
