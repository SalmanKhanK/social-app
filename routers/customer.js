const express = require('express');
const router = express.Router();
const {validateCustomer, Customers} = require('../modules/customers');

router.get('/', async(req,res)=>{
   const customers = await Customers.find();
   res.send(customers);
});

router.post('/create', async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error);

    const isPhoneUnique = await Customers.findOne({phone: req.body.phone});
    if(isPhoneUnique) return res.status(400).send("Phone is already exist")
    
    let customer = new Customers({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
   try{
        customer = await customer.save()
        res.send(customer);
        console.log(customer,'Customer');
   }catch(er){
        console.log(er,'Error')
   }
});

module.exports = router;
