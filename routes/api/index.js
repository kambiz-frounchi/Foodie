const router = require("express").Router();
const recipeRoutes = require("./recipes");
const userRoutes = require("./users");

// Recipe routes
router.use("/recipes", recipeRoutes);
router.use("/users", userRoutes);

module.exports = router;