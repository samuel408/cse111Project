const connection = require('../config/database')

const getProducts = (req, res, next) => {
    const category = req.query.category
    let getProductsQuery
    if(category === undefined) {
        getProductsQuery = `SELECT 
        p.productId,
        p.productname,
        p.productdescription,
        p.categoryId,
        p.quantityOnHand,
        p.price,
        c.categoryName
    FROM 
        products AS p
    JOIN 
        category AS c ON p.categoryId = c.categoryId;
        
        `
    }else {
        getProductsQuery = `SELECT 
        p.productId,
        p.productname,
        p.productdescription,
        p.categoryId,
        p.quantityOnHand,
        p.price,
        c.categoryName
    FROM 
        products AS p
    JOIN 
        category AS c ON p.categoryId = c.categoryId
        WHERE c.categoryName = "${category}"
        `
    }
    try {
        connection.query(getProductsQuery, (err, result) => {
            if(err) throw err
            if(result.length > 0) {
                return res.status(200).json(result)
            }else {
                return res.status(200).json([])
            }
        })
    }catch(err) {
        next(err)
    }
}

const getCategory = (req, res, next) => {
    try {
        const getCategoryQuery = 'SELECT * FROM category ORDER BY categoryId DESC'
        connection.query(getCategoryQuery, (err, result) => {
            if(err) throw err
            if(result.length > 0) {
                return res.status(200).json(result)
            }else {
                return res.status(200).json({message: "Categories not available"})
            }
        })
    }catch(err) {
        next(err)
    }
}

const addProductToCart = (req, res, next) => {
    const userId = req.user.userId
    const {productId} = req.body
    try {
        const insertToCartQuery = `INSERT INTO cart(customerId, productId) VALUES("${userId}", "${productId}")`
        connection.query(insertToCartQuery, (err, result) => {
            if(err) throw err
            return res.status(200).json({message: "1 record inserted"})
        })
    }catch(err){
        next(err)
    }
}

const getProductFromCart = (req, res, next) => {
    const userId = req.user.userId
    try {
        const insertToCartQuery = `
                SELECT 
                *
            FROM 
                cart AS c
            JOIN 
                products AS p ON p.productId = c.productId
                WHERE c.customerId = "${userId}"
                
        `
        connection.query(insertToCartQuery, (err, result) => {
            if(err) throw err
            res.status(200).json(result)
        }) 
    }catch(err) {
        next(err)
    }
}


const removeFromCart = (req, res, next) => {
    const cartId = req.params.cartId
    try {
        const deletCartQuery = `
               DELETE FROM cart WHERE cartId = "${cartId}"`

        
        connection.query(deletCartQuery, (err, result) => {
            if(err) throw err
            res.status(200).json(result)
        }) 
    }catch(err) {
        next(err)
    }
}

module.exports = {
    getProducts,
    getCategory,
    addProductToCart,
    getProductFromCart,
    removeFromCart
}