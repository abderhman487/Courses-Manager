const express = require('express');

const router = express.Router();

const courseController = require('../controller/courses.controller');
const { validation } = require('../middleWare/validation');

router.route('/')
    .get(courseController.getAllCourses)
    .post(validation(),courseController.addCourse)

router.route('/:courseId')
    .get(courseController.getCourse)
    .patch(courseController.editCourse)
    .delete(courseController.deleteCourse)


module.exports = router;
