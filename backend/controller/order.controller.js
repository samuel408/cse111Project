const connection = require("../config/database")


const addOrder = (req, res, next) => {
    const userId = req.user.userId
    const {shippingMethodId} = req.body
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const orderDate = `${year}-${month}-${day}`;

        const addOrderQuery = `INSERT INTO orders(orderDate, customerId, shippingMethodId) VALUES("${orderDate}", "${userId}", "${shippingMethodId}")`
        connection.query(addOrderQuery, (err, result) => {
            if(err) throw err
            res.status(200).json({message: "1 record inserted"})
        })
    }catch(err) {
        next(err)
    }
}

const getOrder = (req, res, next) => {
    const userId = req.user.userId
    try {
        const getOrders = `SELECT * FROM orders WHERE customerId = "${userId}" ORDER BY orderId ASC`
        connection.query(getOrders, (err, result) => {
            if(err) throw err
            if(result.length > 0) {
                res.status(200).json(result)
            }else {
                res.status(200).json({message: "No orders found"})
            }
        })
    }catch(err) {
        next(err)
    }
}

const getOrderDetail = (req, res, next) => {
    const userId = req.user.userId
    const orderId = req.params.id
    try {
        const getOrder = `SELECT * FROM orders WHERE customerId = "${userId}" AND orderId = "${orderId}"`
        connection.query(getOrder, (err, result) => {
            if(err) throw err
            if(result.length > 0) {
                res.status(200).json(result[0])
            }else {
                res.status(200).json({message: "Order not found"})
            }
        })
    }catch(err) {
        next(err)
    }
}  

module.exports = {
    addOrder, getOrder,
    getOrderDetail
}