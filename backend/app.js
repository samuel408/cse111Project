require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const adminRoutes = require('./adminRoutes')
const employeeRoutes = require('./employeeRoutes')
const createHttpError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.use('/api', routes)
app.use('/admin', adminRoutes)
app.use('/employee', employeeRoutes)

//* Catch HTTP 404
app.use((req, res, next) => {
    next(createHttpError(404));
  });
  
  //* Error Handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is up at port ${port}`))