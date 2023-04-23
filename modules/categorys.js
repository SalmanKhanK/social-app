const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 255,
        required: true
    }
})
const Category = mongoose.model('Category', categorySchema);

function validateCategory(category){
    const validationSchema = Joi.object({
        name: Joi.string().min(4).max(255)
    });

    return validationSchema.validate(category)
}

exports.categorySchema = categorySchema;
exports.validateCategory = validateCategory;
exports.Category = Category;
