// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
    console.log("isAuthenticated");
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
      console.log(req.user.id);
      return next();
    }
  
    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/login");
};