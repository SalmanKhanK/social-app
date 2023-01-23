const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {Users, validateUser} = require("../modules/users");

router.post("/create-user", async(req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = new Users(_.pick(req.body,["full_name","email","password"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(200).send(_.pick(user,["_id","full_name","email"]));
});
module.exports = router;
