const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require("passport");

router.route("/").get(
  (req, res) => {
    console.log("processing /api/users");
    console.log(req.user);
    if (req.user) {
      //const user = await usersController.findById(req, res);
      //console.log(user);
      let userInfo = {
        email: req.user.email,
        id: req.user.id,
        //nickname: user.nickname
      };
      res.send({user: userInfo});  
    }
    else {
      res.send({user: {email: "email", id: 0, nickname: "nickname"}});
    }
  }
);

router.route("/login").post(
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    //const user = await usersController.findById(req, res);
    console.log("logged in", req.user);
    let userInfo = {
      email: req.user.email,
      id: req.user.id,
      nickname: req.user.nickname
    };
    res.send({user: userInfo});
  }
);

router
  .route("/signup")
  .post(usersController.create);

router
  .route("/logout")
  .post((req, res, next) => {
    if (req.user) {
      console.log(`logging out ${req.user.id}`);
      const userId = req.user.id;
      req.logout();
      res.send({msg: `${userId} logging out`});
    } else {
      res.send({msg: "no user to log out!"});
    }
  });

module.exports = router;
