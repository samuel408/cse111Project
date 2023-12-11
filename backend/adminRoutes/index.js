const router = require('express').Router()

const adminRoutes = require('./admin.routes')
const routes = [
    {
        path: '/',
        name: adminRoutes
    },
]


routes.forEach((route) => {
    router.use(route.path, route.name)
})

module.exports = router