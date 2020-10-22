const db = require("../models");

// Defining methods for the recipesController
module.exports = {
  findAll: function (req, res) {
    db.Recipe.find(req.query)
      .sort({ createdDate: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function(req, res) {
      db.Recipe
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  }
};
