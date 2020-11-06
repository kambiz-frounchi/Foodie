const db = require("../models");

// Defining methods for the userRecipeStateController
module.exports = {
  create: function (req, res) {
    db.UserRecipeState.create({
      userId: req.body.userId,
      recipeId: req.body.recipeId,
      likeStatus: req.body.likeStatus,
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  find: function (req, res) {
    console.log("UserRecipeState find", req.params.id);
    db.UserRecipeState.find({ userId: req.params.id })
      .then((dbModels) => res.json(dbModels))
      .catch((err) => res.status(422).json(err));
  }
};
