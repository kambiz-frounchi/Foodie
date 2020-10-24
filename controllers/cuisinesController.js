const db = require("../models");

// Defining methods for the cuisinesController
module.exports = {
  findAll: function (req, res) {
    db.Cuisine.find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
