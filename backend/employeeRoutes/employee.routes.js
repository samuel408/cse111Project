const { employeeController } = require('../controller')
const router = require('express').Router()

router.post('/signin', employeeController.signin)

module.exports = router