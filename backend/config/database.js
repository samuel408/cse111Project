const { createConnection } = require('mysql')

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'valleystealz'
})

module.exports = connection