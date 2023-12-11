const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.cookies?.access_token
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.isBlocked === "1") {
      return res.status(403).send("User is blocked")
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


exports.authorizeUserType = (...userType) => {
  return (req, res, next) => {
    if (!userType.includes(req.user.role)) {
      return res.status(403).send('Access Denied!');
    }
    return next();
  };
};