const router = require('express').Router();
const fs = require('fs');
const bodyparser = require('body-parser');
var fileUpload = require("express-fileupload")
router.use(bodyparser.json())
router.use(bodyparser.urlencoded({extended:true}));
router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
router.post('/get-file-data',(req,res)=>{
    console.log('in post');
    let file = req.files.file;
    console.log(file);
   let data = fs.readFileSync(file.tempFilePath)

    console.log(data.toString());
    res.json(data.toString());
})

module.exports = router;