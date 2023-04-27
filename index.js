const mongoose = require("mongoose");
const express = require("express");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const user = require("./routers/user");
const category = require('./routers/category');
const Fawn = require('fawn');
const movie = require('./routers/movie');
const stock = require('./routers/stock');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/SocialApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("database Connected...")

}).catch((err)=>{
   console.log("error",err)
});

Fawn.init('mongodb://127.0.0.1:27017/SocialApp');

app.use(express.json());

app.use("/user",user);
app.use("/category", category);
app.use("/movie", movie);
app.use("/stock", stock);

const port = 5000;
app.listen(port,()=> console.log(`Listening on post${port}...`))