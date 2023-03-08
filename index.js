const mongoose = require("mongoose");
const express = require("express");
const user = require("./routers/user");
const authUser=require("./routers/auth");
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/SocialApp').then(()=>{
    console.log("database Connected...")
}).catch((err)=>{
   console.log("error",err)
});
app.use(express.json());

app.use("/user",user);
app.use("/api/auth",authUser);

const port = 5000;
app.listen(port,()=> console.log(`Listening on post${port}...`))