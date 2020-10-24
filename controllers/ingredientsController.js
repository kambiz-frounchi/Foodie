const db = require("../models");

// Defining methods for the ingredientsController
module.exports = {
  findAll: function (req, res) {
    db.Ingredient.find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
