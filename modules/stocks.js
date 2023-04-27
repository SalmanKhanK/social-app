const Joi = require('joi');
const mongoose = require('mongoose');

const Stock = mongoose.model('stocks', new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                minlength: 4,
                maxlength: 255,
                trim: true,
                required: true
            },
            views: {
                type: Number,
                default: 0
            },
            likes: {
                type: Number,
                default: 0
            }
        }),
        required: true
    },
    user: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    dateReturned: {
        type: Date
    },
    stockFee:{
        type: Number,
        min: 0,
    }
}));

function validateStock(stock){
    const schema = Joi.object({
        movieId : Joi.string().required(),
        userId: Joi.string().required()
    });

    return schema.validate(stock)
}

exports.Stock = Stock;
exports.validateStock = validateStock;