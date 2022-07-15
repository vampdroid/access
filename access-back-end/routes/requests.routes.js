const router = require('express').Router();
let user = require('../models/users.model');
const mongoose = require('mongoose');

let datafield = require('../models/datafields.model');
let request = require('../models/requests.model')
let requestDetail = require('../models/requestdetails.model')
const bodyparser = require('body-parser');
const { route } = require('./ipfs.routes');
router.use(bodyparser.json())


//Get Data Requests Of the User
router.get('/get-requests/:id',async (req,res)=>{
    console.log("inside get request")
    let userId = req.params.id;
    console.log(userId)
    request
    // .find({data_owner:userId}).sort([['created_at', 'descending']])
    .aggregate([
    {
        $match: {
            data_accessor: new mongoose.Types.ObjectId(req.params.id)
        }
    }, {
        $lookup: {
            from: 'users',
            localField: 'data_accessor',
            foreignField: '_id',
            as: 'accessor_data'
        }
    },
    {
        $lookup:{
            from: 'requestdetails',
            localField: '_id',
            foreignField: 'request_id',
            as: 'request_detail'
        }
    },
    {
        $sort:{
            created_at:-1
        }
    }])
  //  request.find()
    .then((requests)=>{
        console.log("inside request exist"+ requests + " this")
        if(!requests)
        {
            res.status(404).send("No User");
        }
        else
        {
            // for(var i=0;i<requests.length;i++)
            // {
            //     let usr = user.findById(requests[i].data_accessor);
            //     reque
            // }
            console.log(requests);
            res.status(200).send(requests);
        }
    })
    .catch((err)=>res.send(err))
})

router.get('/get-access-fields/:id',async (req,res)=>{
    console.log("inside get access fields")
//    let userId = new mongoose.Types.ObjectId(req.params.id)

//     console.log(userId)
    request
    .aggregate([
    {
        $match: {
            data_owner: mongoose.Types.ObjectId(req.params.id),
            status:'acp'
        },
    }, 
    {
        $lookup: {
            from: 'users',
            localField: 'data_accessor',
            foreignField: '_id',
            as: 'owner_data'
        },
    },
    {
        $lookup:{
            from: 'requestdetails',
            localField: '_id',
            foreignField: 'request_id',
            as: 'request_detail'
        },

    },
    {
        $lookup:{
            from:'datafields',
            localField:'request_detail.datafield_id',
            foreignField:'_id',
            as:'request_detail.datafield'
        }
    },
    {
        $sort:{
            created_at:-1
        }
    }])
  //  request.find()
    .then((requests)=>{
        console.log("inside request exist"+ requests + " this")
        if(!requests)
        {
            res.status(404).send("No User");
        }
        else
        {
            // for(var i=0;i<requests.length;i++)
            // {
            //     let usr = user.findById(requests[i].data_accessor);
            //     reque
            // }
            console.log(requests);
            res.status(200).send(requests);
        }
    })
    .catch((err)=>res.send(err))
})


//Create Request
router.post('/create-request',(req,res)=>{
    console.log("inside create request")
    let data_accessor = req.body.accessor_id
    let data_owner = req.body.owner_id
    let newrequest  = new request({data_owner:data_owner,data_accessor:data_accessor,status:'req'})
    newrequest.save()
    .then((newreq)=>{
        console.log("created : "+newreq);
        res.status(200).send(newreq)
    })
    .catch((err)=>console.log(err))
})

//Update Denied or Accept Request
router.put('/update-request',(req,res)=>{
    console.log("inside update request")
    let requestId = req.body.requestId
    let updateStatus = req.body.updateStatus
    request.findOneAndUpdate({_id:requestId},{$set:{status:updateStatus}})
    .then((upreq)=>{
        console.log("created : "+upreq);
        res.status(200).send(upreq)
    })
    .catch((err)=>console.log(err))
})

//delete request

router.delete('/delete-request/:id',(req,res)=>{
    console.log("inside delete request")
    let reqId = req.params.id;
    console.log(reqId)
    request.findOneAndDelete({_id:reqId})
  //  request.find()
    .then((requests)=>{
        console.log(requests);
        res.status(200).send({status:"sucess"});

    })
    .catch((err)=>res.send(err))
})

//creating request detail
router.post('/create-req-detail',(req,res)=>{
    let reqId = req.body.reqId;
    let dataId = req.body.dataId;
    let fieldName = req.body.fieldName;
    let newreqdetail  = new requestDetail({request_id:reqId,field_name:fieldName,datafield_id:dataId})
    newreqdetail.save()
    .then((newreq)=>{
        console.log("created request detail: "+ newreq);
        res.status(200).send(newreq)
    })
    .catch((err)=>console.log(err))

})

//get request detail
router.get('/get-req-details/:id',(req,res)=>{
    console.log("inside get request detail")
    let reqId = req.params.id;
    console.log(reqId)
    requestDetail.find({request_id:reqId})
  //  request.find()
    .then((requests)=>{
        console.log("inside req detail exist"+ requests + " this")
        if(!requests)
        {
            res.status(404).send("No User");
        }
        else
        {
            console.log(requests);
            res.status(200).send(requests);
        }
    })
    .catch((err)=>res.send(err))
})

//delete request detail
router.delete('/delete-req-detail/:id',(req,res)=>{
    console.log("inside delete request")
    let reqId = req.params.id;
    console.log(reqId)
    requestDetail.findOneAndDelete({request_id:reqId})
  //  request.find()
    .then((requests)=>{
        console.log(requests);
        res.status(200).send({status:"sucess"});

    })
    .catch((err)=>res.send(err))
})



module.exports = router;