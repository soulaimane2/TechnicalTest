const { Schema, model } = require("mongoose");

const emailVerificationSchema = Schema({
    email:{
        type: String,
    },
    confirmationCode: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const emailVerificationModel = model("verifiedMail", emailVerificationSchema)


module.exports = emailVerificationModel