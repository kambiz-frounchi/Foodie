const db = require("../models");

// Defining methods for the tagsController
module.exports = {
  findAll: function (req, res) {
    db.Tag.find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
