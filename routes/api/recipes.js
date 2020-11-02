const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");
const isAuthenticated = require("../../passport/isAuthenticated");
const path = require("path");

router.route("/find")
  .post(recipesController.find);

router.route("/")
  .get(recipesController.findAll)
  .post(recipesController.create);

router.route("/upload")
  .post(async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    console.log(req.files);
    //const avatar = req.files.avatar;
    //console.log(avatar);
    //avatar.name = "avatar.jpg";
    const recipeImageFile = req.files.myimage;
    //console.log(avatar);
    // Use the mv() method to place the file somewhere on your server
    /*
    await avatar.mv(path.join(__dirname, "../../images/", avatar.name), err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
    */

    await recipeImageFile.mv(path.join(__dirname, "../../images/", recipeImageFile.name), err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });



    //console.log("upload");
    //console.log(req.body);
    //console.log(req.body);
    //res.json({msg: "file received"});
    res.status(200).send("");
  })

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
