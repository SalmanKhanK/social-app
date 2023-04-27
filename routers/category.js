const express = require('express');
const router = express.Router();
const {Category, validateCategory} = require('../modules/categorys');

router.post('/create-category', async(req,res)=>{
     const {error} = validateCategory(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const category = new Category({
        name: req.body.name,
     });

     try{
        const result = await category.save();
        res.send(result);
        console.log(result, "Resultt")
     }catch(err){
        console.log(err, 'Error')
     }
});

module.exports = router;