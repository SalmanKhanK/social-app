const mongoose = require('mongoose');
const Joi = require('joi');

const Customers = mongoose.model('Customers', new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 255,
        required: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 14,
        minlength: 8,
        unique: true,
    },
    isGold:{
        type: Boolean,
        default: false,
    }
}));

function validateCustomer(v){
    const customerSchema = Joi.object({
        name: Joi.string().min(4).max(255).required(),
        phone: Joi.string().min(8).max(14).required(),
        isGold: Joi.boolean(),
    });
    return customerSchema.validate(v);
}

exports.Customers = Customers;
exports.validateCustomer = validateCustomer;