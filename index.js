const express = require('express');
const app = express();
const util = require('./utils/courses.utils');
const cors = require('cors');
const appError = require('./utils/app.error');

require('dotenv').config()  ;


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('mongodb connect sucsses');
});

app.use(cors());
app.use(express.json());

const courseRouter = require('./routes/courses.route');
const userRouter = require('./routes/users.route');


app.use('/api/courses' , courseRouter);
app.use('/api/users' , userRouter);

app.all('*',(req,res,next)=>{
    res.status(400).json({status:util.ERROR, message : 'this resource is not available'});
});
app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({status: error.statusMessage || util.ERROR  , message:error.message, code:error.statusCode,data:null});
});

app.listen(5000,()=> {console.log('listen');});       