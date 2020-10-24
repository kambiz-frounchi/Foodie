const router = require("express").Router();
const usersController = require("../../controllers/usersController");

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

router.route("/login").post(
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      email: req.user.email,
      id: req.user.id
    };
    res.send(userInfo);
  }
);

router.route("/signup").post((req, res) => {
  console.log(req.user);
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

module.exports = router;
