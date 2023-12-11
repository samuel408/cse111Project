const router = require('express').Router()
const { orderController } = require('../controller')
const {auth} = require('../middleware/auth')

router.post('/', auth, orderController.addOrder)

router.get('/', auth, orderController.getOrder)

router.get('/:id', auth, orderController.getOrderDetail)


module.exports = router