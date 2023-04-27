const express = require('express');
const router = express.Router();
const Fawn = require('fawn')
const {Movies} = require('../modules/movies');
const {Users} = require("../modules/users");
const {validateStock, Stock} = require("../modules/stocks");
const mongoose = require('mongoose');


router.post('/create-stock', async(req,res)=>{
     const {error} = validateStock(req.body);
     if(error) return res.status(400).send(error.details[0].message);
     
     const user = await Users.findById(req.body.userId);
     if(!user) return res.status(400).send("Invalid Customer");

     const movie = await Movies.findById(req.body.movieId);
     if(!movie) return res.status(400).send("Invalid Movie")
  
    if(movie.views === 0) return res.status(400).send("Movie views not found");

     let stock = new Stock({
        movie: {
            _id: movie._id,
            title: movie.title,
            views: movie.views,
            likes: movie.likes
        },
        user: {
            _id: user._id,
            full_name: user.full_name,
            email: user.email
        }
     });
    try {
        Fawn.Task()
            .save('stocks', stock)
            .update('movies', {_id: movie._id}, {$inc: {views: -1}})
            .run();
        res.send(stock);
    }catch(er){
        res.status(500).send("Something went wrong")
    }
});

module.exports = router;
