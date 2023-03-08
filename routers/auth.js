const { Users} = require("../modules/users");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const express = require("express");
const Joi=require("joi");
const router = express.Router();

router.post("/", async (req, res) => {

  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validpassword = await bcrypt.compare(req.body.password,user.password);
  if(!validpassword) return res.status(400).send("Invalid email or password")

  const token=user.genAuthToken();
  const resp={
    token,
    name: user.full_name
  }
  res.send(resp)
});

function ValidateUser(user) {
    const validationSchema = Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required()
    })
     return validationSchema.validate(user) 
 }

module.exports = router;