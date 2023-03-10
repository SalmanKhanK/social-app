const mongoose = require("mongoose");
const express = require("express");
const user = require("./routers/user");
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/SocialApp').then(()=>{
    console.log("database Connected...")
}).catch((err)=>{
   console.log("error",err)
});

console.log(`Cuurent env: ${app.get('env')}`);
app.use(express.json());
if(app.get('env') === 'development'){
    console.log("current env is development.. test")
}
app.use("/user",user);

const port = 5000;
app.listen(port,()=> console.log(`Listening on post${port}...`))