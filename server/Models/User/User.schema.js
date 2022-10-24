const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
})

const UserModel = model("user", UserSchema)

module.exports = UserModel