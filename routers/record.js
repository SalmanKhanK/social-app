const express = require("express");
const router = express.Router();
const { Records, validateRecord } = require("../modules/records");

router.post("/create-record", async (req, res) => {
  const { error } = validateRecord(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let record = new Records({
    name: req.body.name,
  });
  try {
    record = await record.save();
    res.send(record)
  } catch (er) {
    console.log(er);
  }
});

router.get("/", async(req,res)=>{
    const records = await Records.find();
    res.send(records);
});

router.put('/update-record/:id', async(req,res)=>{
    const {error} = validateRecord(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const record = await Records.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    },{new: true});

    if(!record) return res.status(400).send("the record id was not found");
    res.send(record);
});

router.delete('/delete-record/:id', async(req,res)=>{
    const record = await Records.findByIdAndRemove(req.params.id);
    if(!record) return res.status(400).send("the record id was not found");

    res.send(record);
});

router.get('/:id',async(req, res)=>{
    const record = await Records.findById(req.params.id);
    if(!record) res.status(400).send('The record with the given id was not found');

    res.send(record);
})

module.exports = router;
