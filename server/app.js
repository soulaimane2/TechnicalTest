const express =require("express")
const AuthRoutes = require("./Routes/auth.route")

const app = express()

app.use(express.json())
app.use(AuthRoutes)

module.exports = app