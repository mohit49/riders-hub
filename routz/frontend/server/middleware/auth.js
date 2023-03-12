const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
const authenticateJWT = (req, res, next) => {
  var authHeader = req.cookies.token;
  console.log(authHeader);
  jwt.verify(authHeader, SECRET_KEY, function (err, decoded) {
    if (err) {
      res.clearCookie("token");
      res.status(200).json({
        sucessStatus: false,
        data: `loginError`,
      });
    } else {
   
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = authenticateJWT;
