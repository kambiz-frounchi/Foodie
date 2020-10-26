const router = require("express").Router();
const recipeRoutes = require("./recipes");
const ingredientRoutes = require("./ingredients");
const tagsRoutes = require("./tags");
const cuisinesRoutes = require("./cuisines");
const userRoutes = require("./users");

// Recipe routes
router.use("/recipes", recipeRoutes);
router.use("/ingredients", ingredientRoutes);
router.use("/tags", tagsRoutes);
router.use("/cuisines", cuisinesRoutes);
router.use("/users", userRoutes);

router.route("/")
  .get(() => {console.log("hello")});

module.exports = router;