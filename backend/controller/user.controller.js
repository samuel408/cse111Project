const connection = require("../config/database");

const update = (req, res, next) => {
  let {
    firstName,
    lastName,
    phoneNo,
    email,
    stAddress,
    city,
    state,
    zipcode,
    password,
  } = req.body;

  const userId = req.user.userId;
  const findUser = `SELECT * FROM customers WHERE customerId = "${userId}"`;

  connection.query(findUser, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const user = result[0];
      if (firstName === undefined) {
        firstName = user.firstName;
      }
      if (lastName === undefined) {
        lastName = user.lastName;
      }
      if (phoneNo === undefined) {
        phoneNo = user.phoneNo;
      }
      if (email === undefined) {
        email = user.emailAddress;
      }
      if (stAddress === undefined) {
        stAddress = user.stAddress;
      }
      if (city === undefined) {
        city = user.city;
      }
      if (state === undefined) {
        state = user.state;
      }
      if (zipcode === undefined) {
        zipcode = user.zipcode;
      }
      if (password === undefined) {
        password = user.password;
      }
      const updateUserQuery = `UPDATE customers SET firstName="${firstName}", lastName="${lastName}", phoneNo="${phoneNo}", emailAddress="${email}", stAddress="${stAddress}", city="${city}", state="${state}", zipcode="${zipcode}", password="${password}" WHERE customerId = "${userId}"`;
      connection.query(updateUserQuery, (err, result) => {
        if (err) throw err;
      });
      return res.status(200).json({ message: "Profile Updated" });
    } else {
      return next({ status: 404, message: "User not found" });
    }
  });
};

const getProfile = (req, res, next) => {
  const userId = req.user.userId
  try {
    const profileQuery = `SELECT * FROM customers WHERE customerId=${userId}`
    connection.query(profileQuery, (err, result) => {
      if(err) throw err
      if(result.length > 0) {
        const customer = result[0]
        return res.status(200).json(customer)
      }else {
        return res.status(404).json({message: "User not found"})
      }
    })
  }catch(err){
    return next(err)
  }
}
module.exports = {
  update,
  getProfile
};
