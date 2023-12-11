const router = require('express').Router()
const {userController} = require('../controller')
const {auth} = require('../middleware/auth')

router.put('/', auth, userController.update)

router.get('/', auth, userController.getProfile)

module.exports = router