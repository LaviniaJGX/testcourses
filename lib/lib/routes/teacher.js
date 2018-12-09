'use strict';

var _teacher = require('../models/teacher');

var _teacher2 = _interopRequireDefault(_teacher);

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

//find all teachers
router.findAll = function (req, res) {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    _teacher2.default.find(function (err, teachers) {
        if (err) res.send(err);

        res.send(JSON.stringify(teachers, null, 5));
    });
};

//find certain teacher by id:
router.findById = function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    _teacher2.default.find({ "_id": req.params.id }, function (err, teachers) {
        if (err) {
            res.status(404);
            res.send('Teacher NOT Found!!');
        } else {
            res.send(JSON.stringify(teachers, null, 5));
        }
    });
};

//find certain teacher by its name;
router.findByName = function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    _teacher2.default.find({ "name": req.params.name }, function (err, teachers) {
        if (err) {
            res.send('The teacher you asked to find is NOT EXIST!!');
        } else {
            res.send(JSON.stringify(teachers, null, 5));
        }
    });
};

//find certain teacher which contains certain name elements;
router.containNames = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.department;
    var reg = new RegExp(keyword, 'i');
    _teacher2.default.find({ 'department': { $regex: reg } }, function (err, teachers) {
        if (err) {
            res.send('Teacher NOT Found!!');
        }
        // return a suitable error message
        else {
                res.send(JSON.stringify(teachers, null, 5));
            }
        // return the donation
    });
};

//add teacher
router.addTeacher = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var teacher = new _teacher2.default();

    teacher.name = req.body.name;
    teacher.teacherType = req.body.teacherType;
    teacher.teacherGender = req.body.teacherGender;
    teacher.department = req.body.department;
    teacher.departmentMajor = req.body.departmentMajor;

    teacher.save(function (err) {
        if (err) {
            res.json({ message: 'Teacher NOT Added!' });
        }
        // return a suitable error message
        else {

                res.json({ message: 'Teacher Added Successfully!', data: teacher });
            }
        // return a suitable success message
    });
};

router.changeCertainDepartment = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var conditions = { _id: req.params.id },
        update = { department: req.body.department };
    var query = { _id: req.params.id };
    _teacher2.default.update(query, { department: req.body.department }, function (err, teachers) {
        if (err) {
            res.status(404);
            res.json({ message: 'Teacher NOT Found! ', errmsg: err });
        } else {
            res.json('Department changed successfully!');
        }
    });
};

router.changeCertainMajor = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var conditions = { _id: req.params.id },
        update = { departmentMajor: req.body.departmentMajor };
    var query = { _id: req.params.id };
    _teacher2.default.update(query, { departmentMajor: req.body.departmentMajor }, function (err, teachers) {
        if (err) {
            res.status(404);
            res.json({ message: 'Teacher NOT Found! ', errmsg: err });
        } else {
            res.json('Major changed successfully!');
        }
    });
};

//delete teacher by its id;
router.deleteTeacherById = function (req, res) {

    _teacher2.default.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.status(404);
            res.json({ message: 'Cant find Teacher, Teacher NOT Deleted!' });
        }
        // return a suitable error message
        else {
                res.json({ message: 'Teacher Deleted successfully!' });
            }
    });
};

module.exports = router;