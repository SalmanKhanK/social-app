const mongoose = require('mongoose');
const {categorySchema} = require('./categorys');
const Joi = require('joi');

const Movies = mongoose.model('Movies', new mongoose.Schema({
    title:{
        type: String,
        minlength: 4,
        maxlength: 255,
        trim: true,
        required: true
    },
    category: {
        type: categorySchema,
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
}));

function validateMovies(movie){
    const movieSchema = Joi.object({
        title: Joi.string().min(4).max(255).required(),
        categoryId: Joi.objectId().required(),
        views: Joi.number().required(),
        likes: Joi.number().required()
    });

    return movieSchema.validate(movie);
}

exports.Movies = Movies;
exports.validateMovies = validateMovies;