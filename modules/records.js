const mongoose = require('mongoose');
const Joi = require('joi');

const Records = mongoose.model('Records', new mongoose.Schema({
        name: {
            type: String,
            minlength: 4,
            maxlength: 255,
            required: true
        }
}));

function validateRecord(v){
     const validationSchema = Joi.object({
        name: Joi.string().min(4).max(255).required()
     });
     return validationSchema.validate(v)
}

exports.Records = Records;
exports.validateRecord = validateRecord;