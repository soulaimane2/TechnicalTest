const {Router} = require('express')
const { httpRegisterEmail,httpVerifyMail } = require('../controllers/user.controller')


const AuthRoutes = Router()

AuthRoutes.post('/register', httpRegisterEmail)
AuthRoutes.post('/verifyEmail/:code', httpVerifyMail)

module.exports = AuthRoutes