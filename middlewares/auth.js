function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/auth/login");
}

function isGuest(req, res, next) {
  if (req.session.user) {
    return res.redirect("/"); 
  }
  next();
}

module.exports = { isAuthenticated, isGuest };
