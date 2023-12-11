const router = require('express').Router()

const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const productRoutes = require('./product.routes')
const shippingRoutes = require('./shipping.routes')
const orderRoutes = require('./order.routes')
const routes = [
    {
        path: '/auth',
        name: authRoutes
    },
    {
        path: '/user',
        name: userRoutes
    },
    {
        path: '/product',
        name: productRoutes
    },
    {
        path: '/shipping',
        name: shippingRoutes
    },
    {
        path: '/order',
        name: orderRoutes
    }
]


routes.forEach((route) => {
    router.use(route.path, route.name)
})

module.exports = router