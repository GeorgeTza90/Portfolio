const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      } else {
        console.log("Token invalid", err.message);
      }
      next();
    });
  } else {
    next();
  }
}

module.exports = verifyToken;
