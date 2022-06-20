const router = require('express').Router();

let user = require('../models/users.model');
let datafield = require('../models/datafields.model');
const bodyparser = require('body-parser');
// const {response} = require("express");
// const mongoose = require('mongoose');
router.use(bodyparser.json())

//get all users
router.route('/get-users').get((req,res,next)=>{
    user.find(req.body)
    .then((users)=>
    {
        if(!users)
        {
            res.status(400)
            .json({error: 'not found'})
            return;
        }
        res.status(200).json(users);
    })
})

//get user password
router.route('/verify-user').post((req,res,next)=>{
    user.findOne({email:req.body.email})
    .then((user)=>
    {
        if(!user)
        {
            res.status(400).json("User Not Found")
        }
        else
        {
            res.status(200).json(user)
        }
        // if(user.password===req.body.password)
        // {
        //     res.status(200).json("Login Successful")
        // }
        // else
        // {
        //     res.status(400).json("Incorrect Password")
        // }
    })
    .catch((err) => res.json({error:err}));
})



//add one user with fname and lname field :
router.route('/create-user').post((req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const fname = req.body.fname
    const lname = req.body.lname

    const newuser = new user({email,password});
    newuser.save()
    .then((createdUser)=>{
      //  res.json(createdUser._id)
        const userId = createdUser._id;
        // console.log("Inside Created User")
       
        // const fnamedata = new datafield({user:{createdUser},type:'text',field_id:'1', field_name:'first name', field_value_address:{fname}});
        // const lnamedata = new datafield({user:{createdUser},type:'text',field_id:'2', field_name:'last name', field_value_address:{lname}});
        // fnamedata.save()
        // .then((data)=>console.log(""+data._id))
        // .catch(err => res.status(400).json("error :"+err));
        // lnamedata.save()
        // .then((data)=>console.log(""+data._id))
        // .catch(err => res.status(400).json("error :"+err));

        datafield.create({
            user:userId,
            type:'text',
            field_id:'1',
            field_name:'first_name',
            field_value_address:fname
        })
        .then((data1)=>{
            console.log("d ; "+data1._id) 
           // res.json(data1);
            datafield.create({
                user:userId,
                type:'text',
                field_id:'2',
                field_name:'last_name',
                field_value_address:lname
            })
            .then((data2)=>{
                let arr = {data1,data2};
                console.log(arr) 
                res.status(200).json(newuser);
                })
            .catch((err) => res.status(400).json("error :"+err));
            })
        .catch((err) => res.status(400).json("error :"+err));

        return;
    })
    .catch(err => res.status(400).json("error :"+err));
    return
})


module.exports = router;