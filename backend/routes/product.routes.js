const router = require('express').Router()
const { productController } = require('../controller')
const {auth} = require('../middleware/auth')

router.get('/', auth, productController.getProducts)

router.get('/category', auth, productController.getCategory)

router.post('/cart', auth, productController.addProductToCart)

router.get('/cart', auth, productController.getProductFromCart)

router.delete('/cart/:cartId', auth, productController.removeFromCart)

module.exports = router