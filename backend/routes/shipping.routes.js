const router = require('express').Router()
const {auth} = require('../middleware/auth')
const { shippingController }  = require('../controller')

router.post('/', auth, shippingController.addShippingInfo)

router.get('/', auth, shippingController.getShippingInfo)

module.exports = router