require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const customerRoutes = require('./routes/customers')
const authRoutes = require('./routes/auth');
const resetPasswordRoutes = require('./routes/resetPassword')
const productRoutes = require('./routes/product')
const addressRoutes = require('./routes/addressRoutes')
const path = require('path');
const cors = require('cors'); // CORS paketini ekleyin

const app = express()

// CORS Middleware
app.use(cors())

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Statik dosya servisi
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/customers', customerRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/resetpassword', resetPasswordRoutes)
app.use('/api/products', productRoutes)
app.use('/api/address', addressRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to db')
            console.log('Listening on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
