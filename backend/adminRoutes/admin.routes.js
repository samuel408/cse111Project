const { authorizeUserType, auth } = require('../middleware/auth')
const { adminController } = require('../controller')
const router = require('express').Router()

router.get('/users', auth, authorizeUserType('admin'), adminController.getUsers)

router.put('/restrict-account/:userId', auth, authorizeUserType('admin'), adminController.restrictAccount)

router.post('/add-category', auth, authorizeUserType('admin'), adminController.addCategory)

router.put('/edit-category/:id', auth, authorizeUserType('admin'), adminController.editCategory)

router.post('/add-product', auth, authorizeUserType('admin'), adminController.addProducts)

router.put("/edit-product/:id", auth, authorizeUserType("admin"), adminController.editProduct)

router.get('/all-orders', auth, authorizeUserType('admin'), adminController.allOrders)

router.put('/edit-order/:id', auth, authorizeUserType('admin'), adminController.editOrder)

router.delete('/delete-order/:id', auth, authorizeUserType('admin'), adminController.deleteOrder)

module.exports = router