
const connection = require('../config/database')
const jwt = require('jsonwebtoken')

const signin = (req, res, next) => {
    const { email, password } = req.body;
    try {
      const findUser = `SELECT * FROM employees WHERE emailAddress = "${email}"`;
      connection.query(findUser, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const user = result[0];
          const secret = process.env.JWT_SECRET;
          const payload = {
            userId: user.employeeId,
            email: user.email,
            role: user.role
          };
          if (password.toString() !== user.password) {
            return next({ status: 400, message: "Bad credentials" });
          }
          const token = jwt.sign(payload, secret);
          res
            .cookie("access_token", token)
            .status(200)
            .json(user);
        } else {
          return next({ status: 404, message: "User not found" });
        }
      });
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    signin
}