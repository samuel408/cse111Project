
const router = require('express').Router()

const employeeRoutes = require('./employee.routes')
const routes = [
    {
        path: '/',
        name: employeeRoutes
    },
]

routes.forEach((route) => {
    router.use(route.path, route.name)
})

module.exports = router