const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const user = require("./routers/user");
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/SocialApp').then(()=>{
    console.log("database Connected...")
}).catch((err)=>{
   console.log("error",err)
});
app.use(express.json());

console.log(`current env: ${config.get('info.host')}`);
app.use("/user",user);

const port = 5000;
app.listen(port,()=> console.log(`Listening on post${port}...`))