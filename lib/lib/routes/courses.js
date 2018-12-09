'use strict';

var _courses = require('../models/courses');

var _courses2 = _interopRequireDefault(_courses);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

var mongodbUri = 'mongodb://test:dreammj01@ds151453.mlab.com:51453/testcourses';
_mongoose2.default.connect(mongodbUri, { useNewUrlParser: true });

var db = _mongoose2.default.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//find all courses in database
router.findAll = function (req, res) {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    _courses2.default.find(function (err, courses) {
        if (err) res.send(err);else res.send(courses, null, 5);
    });
};

//find certain course by id:
router.findById = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _courses2.default.find({ "_id": req.params.id }, function (err, courses) {
        if (err) {
            res.status(404);
            res.send({ message: "Invalid id or teacherName,Do not match!" });
        } else if (courses[0].teacherType === "admin" || courses[0].teacherName === req.params.teacherName) {
            res.send(JSON.stringify(courses, null, 5));
        } else if (courses[0].teacherType === "admin") {
            res.send(JSON.stringify(courses, null, 5));
        } else {
            res.json('You are not the administrant ! You can not see all courses!');
        };
    });
};

function getTotalNumbers(array) {
    var totalNumbers = 0;
    array.forEach(function (obj) {
        totalNumbers += obj.classHours;
    });
    return totalNumbers;
}

router.findTotalNumbers = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _courses2.default.find(function (err, courses) {
        if (err) {
            res.status(404);
            res.send(err);
        } else res.json([{ totalNumbers: getTotalNumbers(courses) }]);
    });
};

function getTotalHours(array) {
    var totalHours = 0;
    array.forEach(function (obj) {
        totalHours += obj.classHours;
    });
    return totalHours;
}

router.findTotalHours = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _courses2.default.find(function (err, courses) {
        if (err) {
            res.status(404);
            res.send(err);
        } else res.json([{ totalHours: getTotalHours(courses) }]);
    });
};

router.findByElements = function (req, res) {
    //fuzzy search
    res.setHeader('Content-Type', 'application/json');
    var keyword = { 'courseTitle': { $regex: req.params.courseTitle, $options: 'i' } };
    _courses2.default.find(keyword, function (err, courses) {
        if (courses.length <= 0) {
            res.status(404);
            res.json({ message: 'Course Not Found!!' });
        } else res.send(JSON.stringify(courses, null, 5));
    });
};

function getByValue(array, id) {
    var result = array.filter(function (obj) {
        return obj.id == id;
    });
    return result ? result[0] : null; // or undefined
}
//add course
router.addCourse = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var course = new _courses2.default();

    course.courseTitle = req.body.courseTitle; // the requested value
    course.classHours = req.body.classHours; // the requested value
    course.studentNumbers = req.body.studentNumbers;
    course.studentCategory = req.body.studentCategory;
    course.teacherName = req.body.teacherName;
    course.teacherType = req.body.teacherType;

    if (req.body.courseTitle != null && req.body.classHours != null && req.body.studentNumbers != null && req.body.studentCategory != null && req.body.teacherName != null && req.body.teacherType != null) {
        course.save(function (err) {
            if (err) res.json({ message: 'Course NOT Added!', errmsg: err });
            // return a suitable error message
            else {
                    res.json({ message: 'Course Added Successfully!', data: course });
                }
            // return a suitable success message
        });
    } else {
        res.json('Wrong Properties!');
    }
};

router.changeCourses = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var conditions = { _id: req.params.id },
        update = { classHours: req.body.classHours, studentNumbers: req.body.studentNumbers, teacherName: req.body.teacherName, teacherType: req.body.teacherType };
    var query = { _id: req.params.id };
    _courses2.default.updateMany(query, update, function (err, courses) {
        //console.log(allCourses);
        if (err) {
            res.json({ message: 'Course NOT Found! ', errmsg: err });
        } else {
            res.json('Course changed successfully!');
        }
    });
};

router.changeCertainHours = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _courses2.default.find({ teacherName: req.params.teacherName }, function (err, courses) {
        if (err) {
            res.send(err);
        } else if (courses[0].teacherType === "admin") {
            var conditions = { _id: req.params.id },
                update = { classHours: req.body.classHours };
            var query = { _id: req.params.id };
            _courses2.default.updateMany(query, { classHours: req.body.classHours }, function (err, courses) {
                //console.log(allCourses);
                if (err) {
                    res.status(404);
                    res.json({ message: 'Course NOT Found! ', errmsg: err });
                } else {
                    res.json('ClassHours changed successfully!');
                }
            });
        } else {
            res.json({ message: 'You have no right!' });
        }
    });
};

router.changeCertainNumbers = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _courses2.default.find({ teacherName: req.params.teacherName }, function (err, courses) {
        if (err) {
            res.send(err);
        } else if (courses[0].teacherType === "admin") {
            var query = { _id: req.params.id };
            _courses2.default.updateMany(query, { studentNumbers: req.body.studentNumbers }, function (err, courses) {
                //console.log(allCourses);
                if (err) {
                    res.status(404);
                    res.json({ message: 'Course NOT Found! ', errmsg: err });
                } else {
                    res.json('StudentNumbers changed successfully!');
                }
            });
        } else {
            res.json({ message: 'You have no right!' });
        }
    });
};

//change teacher
router.changeCertainTeacher = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _courses2.default.find({ teacherName: req.params.teacherName }, function (err, courses) {
        if (err) {
            res.send(err);
        } else if (courses[0].teacherType === "admin") {
            var query = { _id: req.params.id };
            _courses2.default.updateMany(query, { teacherName: req.body.teacherName }, function (err, courses) {
                //console.log(allCourses);
                if (err) {
                    res.status(404);
                    res.json({ message: 'Course NOT Found! ', errmsg: err });
                } else {
                    res.json('Teachers changed successfully!');
                }
            });
        } else {
            res.json('You have no right!');
        }
    });
};

//delete Course by its id;
router.deleteCourse = function (req, res) {

    _courses2.default.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.status(404);
            res.json({ message: 'Course NOT Deleted!', errmsg: err });
        } else res.json({ message: 'Course Successfully Deleted!' });
    });
};

module.exports = router;