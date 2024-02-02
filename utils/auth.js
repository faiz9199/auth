const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decoded = jwt.verify(req.headers["authorization"], process.env.SECRET);
    next();
  } catch (error) {
    res.status(403).json({ message: "Token is not valid or its expired" });
  }
};

module.exports = { ensureAuthenticated };
