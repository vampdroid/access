const router = require('express').Router();
// let user = require('../models/users.model');
let datafield = require('../models/datafields.model');
const bodyparser = require('body-parser');
router.use(bodyparser.json())

//get all datafields of a particular user
//pass user : id in the body
router.route('/get-datafields').get((req,res)=>{
    datafield.find({
        user:req.body.user
    })
    .then((datafields)=>{
        if(!datafields)
            res.status(400).json({error:"Not Data Fields Found"})
        else
            res.status(200).json(datafields);
    })
    .catch(err => res.json(err));
})

//create a datafield at user side
router.route('/create-datafield').post((req,res)=>{
    datafield.create({
        user:req.body.user,
        type:req.body.type,
        field_id:req.body.field_id,
        field_name:req.body.field_name,
        field_value_address:req.body.field_value_address
    })
    .then((data)=>{
        console.log("data id : "+data._id) 
        res.status(200).json(data);
        })
    .catch((err) => res.status(400).json("error :"+err));
})


module.exports = router;