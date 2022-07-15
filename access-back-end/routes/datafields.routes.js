const router = require('express').Router();
let user = require('../models/users.model');
let datafield = require('../models/datafields.model');
const bodyparser = require('body-parser');
const tokenModel = require('../models/token.model');
const { route } = require('./requests.routes');
router.use(bodyparser.json())

//get all datafields of a particular user
//pass user : id in the body
router.route('/get-datafields/:id').get((req,res)=>{
    console.log(req.params.id);

    datafield.find({
        user:req.params.id
    })
    .then((datafields)=>{
        if(!datafields)
            res.status(400).send({error:"Not Data Fields Found"})
        else
        {
            console.log(datafields)
            res.status(200).send(datafields);
        }
    })
    .catch(err => res.json(err));
})

//Get datafield by id of that field
router.route('/get-datafield-by-id/:id').get((req,res)=>{
    datafield.find({_id:req.params.id})
    .then((dt)=>{
        res.send(dt);
    })
})

// router.route('/get-datafields-by-email/:email').get(async(req,res)=>{
//     console.log(req.params.email);
//     let curuser = await user.find({email:req.params.email});
//     let userId = curuser._id
//     datafield.find({
//         user:userId
//     })
//     .then((datafields)=>{
//         if(!datafields)
//             res.status(404).send({error:"Not Data Fields Found"})
//         else
//         {
//             console.log(datafields)
//             res.status(200).send(datafields);
//         }
//     })
//     .catch(err => res.json(err));
// })

//create a datafield at user side
router.route('/create-datafield').post((req,res)=>{
    console.log("Inside Create Field"+req.body.user)
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
    .catch((err) =>{ 
        console.log(err)
        res.status(400).json("error :"+err)});
})

router.route('/update-datafield/:userid/:field_id').put((req,res)=>{
    console.log("request came"+req.body.field_id)
    datafield.findOneAndUpdate({user:req.params.userid,field_id:req.params.field_id},
        {$set:
            {
                field_name:req.body.field_name,
                field_value_address:req.body.field_value_address
            }
        })
    .then((data)=>{
            console.log(data)
            if(!data)
                res.status(400).send("error");
            else
                res.status(200).json(data)
        })
    .catch(err=>console.log(err))

})

router.delete('/delete/:id',(req,res)=>{
    console.log('Inside Delete Datafield');
    datafield.remove({_id:req.params.id})
    .then((data)=>{
        console.log("created : "+data);
        res.status(200).send(data)
    })
    .catch((err)=>console.log(err))
})

module.exports = router;