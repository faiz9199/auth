const express = require("express")
const routes = express.Router()
const {registerUser, loginUser} = require('../controllers/userControllers')
const {userRegisterValidate, userLoginValidate} = require("../utils/userValidation")
// const {ensureAuthenticated} = require('../utils/auth')

routes.post('/register', userRegisterValidate, registerUser)
routes.post('/login', userLoginValidate, loginUser)


module.exports = routes

