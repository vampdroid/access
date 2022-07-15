const router = require('express').Router();
const mailer = require('nodemailer');
const jwt = require('jsonwebtoken')
let user = require('../models/users.model');
let datafield = require('../models/datafields.model');
const bodyparser = require('body-parser');
// const {response} = require("express");
// const mongoose = require('mongoose');
router.use(bodyparser.json())
let usertoken = require('../models/token.model');
const crypto = require("crypto"); 
const bcrypt = require('bcrypt');

//sending mail transporter
let transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
})


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

// User Exist
router.get('/exist/email/:email',(req,res)=>{
    let email = req.params.email;
    user.findOne({email:email})
    .then((user)=>{
       
        if(!user)
        {
            res.status(404).send("No User");
        }
        else
        {
            console.log(user)
            res.status(200).send(user);
        }
    })
    .catch((err)=>res.send(err))
})
// User Exist Id
router.get('/exist/id/:id',(req,res)=>{
    let id = req.params.id;
    console.log(id)
    user.findById(id)
    .then((usr)=>{
        console.log(usr)
        if(!usr)
        {
            res.status(404).send("No User");
        }
        else
        {
            console.log(usr)
            res.status(200).send(usr);
        }
    })
    .catch((err)=>res.send(err))
})

//login module
router.post('/login',async(req,res,next)=>{
    user.findOne({email:req.body.email})
    .then((user)=>
    {
        if(!user)
        {
            res.status(400).json("User Not Found")
        }
        else
        {
            if(!user.verified)
            {
                let token = token.findOne({userId:user._id});
                if(!token){
                    const userToken = new token({userId:user._id,token:crypto.randomBytes(32).toString('hex')}).save()

                    const url = `localhost:3000/${user._id}/verify-user/${userToken.token}`;
                    const mailOptions = {
                        from: process.env.AUTH_EMAIL,
                        to: email,
                        subject: "Verification Email",
                        html: `
                            <body>
                            <h1>Verify Your Email </h1>
                            <hr>
                            <h3>Important: This link will be valid for only 1 Hour! </h3>
                            <p> Click <a href=${url}>here</a> to verify your account. </p>
                            <hr>
                            </body> `
                    }
                
                    transporter.sendMail(mailOptions)
                        .then(() => {
                            console.log("Mail Sent!")
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                else
                {
                   return res.status(200).send({message:"Please Verify Your Email First!"})
                }
            }
            if(user.password==req.body.password)
            {
                const token = jwt.sign({ user: user }, process.env.SECRET);
                return res.header('auth-token',token).send({token:token,user:user._id});
            }
            else
            {
                return res.send({});
            }

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

router.get('/verify-token/:token',(req,res)=>{
    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Access Denied");
    try{
        const verified = jwt.verify(token,process.env.SECRET);
        req.user = verified;
        next();
    }
    catch(e)
    {
        res.status(400).send("Invalid Token "+e);
    }
})

router.get('/:id/verify-user/:token',async (req,res)=>{
    // try{
        console.log("in verify-user")
        const usr = await user.findOne({_id:req.params.id});
        if(!usr) return res.status(400).send({message:'Invalid Link'})
        const token = await usertoken.findOne({
            userId:req.params.id,
            token:req.params.token
        });
        if(!token) return res.status(400).send({message:'Invalid Token'})

        await user.findOneAndUpdate({_id:usr._id},{$set:{verified:true}});
        await token.remove();
        console.log("Done!")
        res.status(200).send({message:"Email Verified Successfully"})
    // }
    // catch(err)
    // {
    //     res.status(500).send({message:"Internal Server Error"})
    // }
})

//add one user with fname and lname field :
router.post('/create-user',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const fname = req.body.fname
    const lname = req.body.lname
    // const salt = 10;
    // const passwordHash = bcrypt.hash(req.body.password, salt);

    const newuser =new user({email,password});
    newuser.save()
    .then(async (createdUser)=>{
      //  res.json(createdUser._id)
      console.log(createdUser)
        const userId = createdUser._id;
        const userToken = await new usertoken({userId:userId,token:crypto.randomBytes(32).toString('hex')}).save()
        .then((data)=>{
        
        console.log("token created : "+data._id)

        const url = `http://localhost:3000/${userId}/verify-user/${data.token}`;
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: createdUser.email,
            subject: "Verification Email",
            html: `
                <body>
                <h1>Verify Your Email </h1>
                <hr>
                <h3>Important: This link will be valid for only 1 Hour! </h3>
                <p> Click <a href=${url}>here</a> to verify your account. </p>
                <hr>
                </body> `
        }
        console.log(mailOptions);
        transporter.sendMail(mailOptions)
            .then(() => {
                console.log("Mail Sent!")
            })
            .catch((err) => {
                console.log(err);
            });

        datafield.create({
            user:userId,
            type:'text',
            field_id:'0',
            field_name:'first_name',
            field_value_address:fname
        })
        .then((data1)=>{

            console.log("d ; "+data1._id) 
           // res.json(data1);
            datafield.create({
                user:userId,
                type:'text',
                field_id:'1',
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
    })})
    .catch(err => res.status(400).json("error :"+err));
    return
})


module.exports = router;