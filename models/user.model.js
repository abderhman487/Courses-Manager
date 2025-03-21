const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail , "field must be a valid email"]
    },
    password:{
        type:String,
        required:true,
    }
    
});

module.exports = mongoose.model('User',userSchema) ;