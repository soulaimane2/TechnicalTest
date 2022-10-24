const emailVerificationModel = require("./emalVarification.Schema")
const UserModel = require("./User.schema")

async function findEmail({email}){
    try{
        const findmail = await UserModel.findOne({email: email}).exec()

        if(findmail) return {error: true, message:"email already exists please login!"}

        return {error: false}

    }catch(err){
        return {error: true, message: "Something went wrong"}
    }
}

async function addMailToVerify({email}){
    try{

        const code = Math.floor(Math.random() * 1000000)

        const mail = await new emailVerificationModel({
            email,
            confirmationCode: code
        }).save()

        if(mail) return {error: false, confirmationCode: code}
    }catch(err){
        return {error: true, message: error}
    }
}


async function checkCode ({code}) {
    try{
        console.log({code})
        const findmail = await emailVerificationModel.findOne({confirmationCode: code}).exec()
        console.log(findmail)
        if(findmail) return {error: false, message:"Email successfuly verified!"}

        return {error: true, message: "the code is wrong!"}

    }catch(err){
        return {error: true, message: "Something went wrong"}
    }
}

async function updateStatus ({code}) {
    try{

        const findmail = await emailVerificationModel.findOneAndUpdate({confirmationCode: code},{verified: true}).exec()


        if(findmail) return {error: false, message: "Email is verified Successuly!"}

        return {error: true, message: "No email was found!"}

    }catch(err){
        return {error: true, message: "Something went wrong!"}

    }
}

module.exports = {
    findEmail,
    addMailToVerify,
    checkCode,
    updateStatus
}