const http = require("http")
const app = require("./app")
const { DbConnect } = require("./utils/db/db")
const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 4040

const server = http.createServer(app)


server.listen(PORT, async () => {
    await DbConnect()
    console.log(`We're listening on ${PORT}`)
})