const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
       full_name :{
          type: String,
          min:[4,'Must be at least 4 characters, got {VALUE}'],
          max: 55,
          required: true,
       },
       email :{
          type: String,
          max: 55,
          required: true,
       },
       password:{
          type: String,
          min:[6,'Must be at least 6, got {VALUE}'],
          max: 55,
          required: true 
       }
});
function validateUser(user) {
   const validationSchema = Joi.object({
      full_name:Joi.string().min(4).max(55).required(),
      email: Joi.string().max(55).required().email(),
      password: Joi.string().min(6).max(55).required(), 
   })
    return validationSchema.validate(user) 
}
const Users = mongoose.model("Users",UserSchema);
exports.Users = Users;
exports.validateUser = validateUser 

