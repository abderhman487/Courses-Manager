const asyncWrapper = require("../middleWare/asyncWrapper");
const User = require('../models/user.model');
const stat = require('../utils/courses.utils');
const AppError = require('../utils/app.error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()  ;

const getAllUsers = asyncWrapper( async (req,res) => {
    const query = req.query ;
    const limit = query.limit;
    const page = query.page;
    const skip = (page-1) * limit ; 

    const users = await User.find({},{__v:false,password:false}).limit(limit).skip(skip);
    res.json({status:stat.SUCCESS,data:{users}});    
}) 

const register = asyncWrapper( async(req,res,next) => {
    const {firstName , lastName , userName , email , password } = req.body ;

    const oldUserName = await User.findOne({userName : userName});
    const oldUserEmail = await User.findOne({email : email});
    if(oldUserName && oldUserEmail) return next(new AppError('username and email already exists', 400 , stat.FAIL));
    if(oldUserName) return next(new AppError('username already exists', 400 , stat.FAIL));
    if(oldUserEmail) return next(new AppError('email already exists', 400 , stat.FAIL));

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await new User({firstName , lastName , userName , email , password: hashedPassword });


    const token = await jwt.sign({email: newUser.email , id: newUser._id},process.env.JWT_SECRET_KEY , {expiresIn:'1m'});
    newUser.token = token ;

    await newUser.save();
     
    res.status(201).json({status:stat.SUCCESS,data:{user:newUser}});
})

const login = asyncWrapper( async(req,res,next) => {

    const {email,userName,password} = req.body ;
    if ((!email && !userName) && (!password || password)) return next(new AppError('please enter your email or username',400, stat.FAIL));
    else if ((email || userName)&& !password) return next(new AppError('please enter the password',400, stat.FAIL));
    
    const userCheckEmail = await User.findOne({email:email});
    const userCheckUsername = await User.findOne({userName:userName});

    if (userCheckEmail || userCheckUsername){
        const isPasswordCorrect = bcrypt.compare(password,User.password);
        if(isPasswordCorrect){ 

            const token = await jwt.sign({email:email , id: userCheckEmail._id},process.env.JWT_SECRET_KEY , {expiresIn:'1m'});
            return res.json({status:stat.SUCCESS,data:{token}});
        }
        else return next(new AppError('reEnter the password',400, stat.FAIL));
    }
    else return next(new AppError('this user is not found',404, stat.ERROR));  
}) 

module.exports = {
    getAllUsers,
    register,
    login
}