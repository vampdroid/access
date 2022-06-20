const express = require('express');
const path  = require('path');
const app = express()
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const cors = require('cors');
const User = require('./models/users.model');
const dotenv = require("dotenv").config();

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database Connected... Port : ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
});
app.use(express.static(path.join(__dirname, 'public')));


const userRouter = require('./routes/users.routes');
app.use('/user',userRouter);

const categoryRouter = require('./routes/datafields.routes');
app.use('/datafields',categoryRouter);

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port:${process.env.PORT}`);
});

module.exports = app;