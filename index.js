const express = require('express')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
require('dotenv').config()
require('./config/db')

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/products', productRoutes);
app.use('/users', userRoutes)

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`)
})