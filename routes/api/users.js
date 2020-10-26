const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("passport");

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

router
  .route("/signup")
  .post(usersController.create);

router
  .route("/logout")
  .post(() => {
    if (req.user) {
      console.log(`logging out ${req.user.id}`);
      req.logout();
      res.send({msg: `${req.user.id} logging out`});
    } else {
      res.send({msg: "no user to log out!"});
    }
  });

module.exports = router;
