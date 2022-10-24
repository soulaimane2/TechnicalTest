const { findEmail, addMailToVerify, checkCode, updateStatus } = require("../Models/User/user.Model")
const sendMail = require("../utils/mail/sendMail")
const { UserValidatorSchema } = require("../utils/validators/user.validator")

async function httpRegisterEmail(req, res) {
    try{

        const {email} = req.body
        const validateRequest = UserValidatorSchema.validate({email})

        if(validateRequest.error) return res.status(400).json({
            error: true, 
            message: validateRequest.error.message
        })
        console.log(email)
        
        const checkEmail = await findEmail({email})

        if(checkEmail.error) return res.status(409).json(checkEmail)

        const addMailForVerification = await addMailToVerify({email})

        if(addMailForVerification.error) return res.status(400).json(addMailForVerification)

        const sendEMail = await sendMail({email, confirmationCode: addMailForVerification.confirmationCode})

        if(sendEMail.error) return res.status(400).json(sendEMail)

        return res.status.json(addMailForVerification)

    }catch(err) {
        return {error: true, message: "Something went wrong!"}
    }
}



async function httpVerifyMail(req, res) {
    try{

        const {code} = req.body
        console.log(code)

        const checkSentCode = await checkCode({code})

        if(checkSentCode.error) return res.status(400).json(checkSentCode)


        const updateStatus = await updateStatus({code})

        if(updateStatus.error) return res.status(400).json(updateStatus)

        return res.status(200).json(updateStatus)

    }catch(err){
        return {error: true, message: "Something went wrong!"}
    }
}

module.exports= {
    httpRegisterEmail,
    httpVerifyMail
}