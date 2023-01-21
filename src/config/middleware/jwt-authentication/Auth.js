const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).json({ error: "token is required" });
  }
  const bearer = authorization.split(" ");
  const token = bearer[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "invalid token" });
    }
    req.loggedUser = { id: payload.id, email: payload.email };
    next();
  });
};

module.exports = auth;
