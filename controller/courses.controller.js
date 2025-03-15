const {validationResult} = require('express-validator');
const Course = require('../models/courses.model');
const stat = require('../utils/courses.utils');
const asyncWrapper = require('../middleWare/asyncWrapper.js');
const AppError = require('../utils/app.error.js');

const getAllCourses = asyncWrapper(async (req,res) => {
        const query = req.query ;
        const limit = query.limit || 2 ;
        const page =  query.page || 1 ;
        const skip = (page-1) * limit ; 

        const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip);
        res.json({status:stat.SUCCESS, data:{courses}});
    }
);

const getCourse = asyncWrapper(async (req,res,next) => {
    const course = await Course.findById(req.params.courseId ,{"__v":false});
        if(!course) return next(new AppError('course not found', 404, stat.FAIL));
        return res.json({status:stat.SUCCESS, data:{course}});
});

const addCourse = asyncWrapper( async (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return next(new AppError(errors.array(),400,stat.FAIL));

        const newCourse = await new Course(req.body);
        await newCourse.save();
        res.status(201).json({status:stat.SUCCESS, data:{course : newCourse}});
})

const editCourse = asyncWrapper(async (req,res) => {
    const courseId = req.params.courseId;
    const course = await Course.updateOne({_id:courseId}, {$set :{...req.body}});
    return res.status(200).json({status:stat.SUCCESS, data:{course}});
});

const deleteCourse = asyncWrapper(async (req,res) => {
        const courseId = req.params.courseId;
        await Course.deleteOne({_id : courseId});
        res.status(200).json({status:stat.SUCCESS, data: null });
});

module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    editCourse,
    deleteCourse
}