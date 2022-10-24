const dotenv = require("dotenv")
dotenv.config()
const { default: mongoose } = require("mongoose");

async function DbConnect(){
    await mongoose.connect(process.env.DB_STRING)
}

mongoose.connection.on("open", (err) => {
    console.log("Db connected successfully!")
})

mongoose.connection.on("error", (err) => {
    throw new error(err)
})

module.exports = {DbConnect}