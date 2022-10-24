const Joi = require("joi");

const UserValidatorSchema = Joi.object({
    email: Joi.string().email().required()
})

module.exports = {
    UserValidatorSchema
}