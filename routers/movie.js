const express = require('express');
const router = express.Router();
const {Movies, validateMovies} = require('../modules/movies');
const {Category} = require('../modules/categorys');

router.post('/create-movie', async(req,res)=>{
    const {error} = validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if(!category) return res.status(400).send('Category not found')

    const movie = new Movies({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        views: req.body.views,
        likes: req.body.likes
    });

    try{
        await movie.save();
        res.status(200).send(movie);
        console.log(movie,'Result');
    }catch(err){
        console.log(err, "Error")
    }
});

module.exports = router;