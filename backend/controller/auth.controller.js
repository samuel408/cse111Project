const connection = require('../config/database')
const jwt = require('jsonwebtoken')

const signup = (req, res, next) => {
    const {firstName, lastName, phoneNo, email, stAddress, city, state, zipcode, password} = req.body
    if(!firstName || !lastName || !phoneNo || !email || !stAddress || !city || !state || !zipcode || !password) {
        return next({status: 400, message: "Fields are required!!"})
    }
    try {
        const findUser = `SELECT * FROM customers WHERE emailAddress = "${email}"`
        connection.query(findUser, (err, result, fields) => {
            if (err) throw err;
            if(result.length > 0) {
                return next({status: 400, message: "User already exists"})
            }
            const insertUser = `INSERT INTO customers(firstName, lastName, phoneNo, emailAddress, stAddress, city, state, zipcode, password) VALUES("${firstName}", "${lastName}", "${phoneNo}", "${email}", "${stAddress}", "${city}", "${state}", "${zipcode}", "${password}")`
            connection.query(insertUser, (err, result) => {
                if(err) throw err
                res.status(200).json({message: "1 record inserted"})
            })
          });
    }catch(err) {
        next(err)
    }
}

const signin = (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password) {
        return next({status: 400, message: "Fields are required!!"})
    }
    try {
        const findUser = `SELECT * FROM customers WHERE emailAddress = "${email}"`
        connection.query(findUser, (err, result, fields) => {
            if (err) throw err;
            if(result.length > 0) {
                const user = result[0]
                if(user.isBlocked === "1") {
                    return next({status: 403, message: "User is blocked"})
                }
                const secret = process.env.JWT_SECRET
                const payload = {
                    userId: user.customerId,
                    email: user.email,
                    isBlocked: user.isBlocked
                };
                if(password.toString() !== user.password) {
                    return next({status: 400, message: "Bad credentials"})
                }
                const token = jwt.sign(payload, secret)
                res.cookie('access_token', token).status(200).json(user)
            }else {
                return next({status: 404, message: "User not found"})
            }
          });
    }catch(err) {
        next(err)
    }
}

module.exports = {
    signup,
    signin,
}