
const router = require('express').Router()
const { authController } = require('../controller')

router.post('/signin', authController.signin)

router.post('/signup', authController.signup)

module.exports = router