// Not used because no JWT
const authMiddleware = (req, res, next) => {
  next();
};

module.exports = authMiddleware;
