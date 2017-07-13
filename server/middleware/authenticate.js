const authenticate = (req, res, next) => {
  if (req.cookies.user) return next();
  else res.status(401).redirect('/login');
};

module.exports = { authenticate };