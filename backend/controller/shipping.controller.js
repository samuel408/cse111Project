const connection = require("../config/database")


const addShippingInfo = (req, res, next) => {
    const {type, price} = req.body
    if(!type || !price) {
        return res.status(400).json({message: "Fields are required"})
    }
    try {
        const insertShippingQuery = `INSERT INTO shipping(type, price) VALUES("${type}", "${price}")`
        connection.query(insertShippingQuery, (err, result) => {
            if(err) throw err
            res.status(200).json({message: "1 record inserted"})
        })
    }catch(err) {
        next(err)
    }
}

const getShippingInfo = (req, res, next) => {
    try {
        const getShippingQuery = `SELECT * FROM shipping`
        connection.query(getShippingQuery, (err, result) => {
            if(err) throw err
            if(result.length > 0) {
                res.status(200).json(result)
            }else {
                res.status(200).json({message: "Shipping info not added"})
            }
        })
    }catch(err) {
        next(err)
    }
}

module.exports = {
    addShippingInfo,
    getShippingInfo
}