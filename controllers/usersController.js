const db = require("../models");

// Defining methods for the usersController
module.exports = {
  create: function (req, res) {
    console.log("user create");
    console.log(req.body);
    db.User.create(req.body)
      .then((dbUser) => {
        console.log(dbUser);
        res.json(dbUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
};
