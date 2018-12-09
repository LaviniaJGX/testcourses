'use strict';

var _student = require('../models/student');

var _student2 = _interopRequireDefault(_student);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

//find all students
router.findAll = function (req, res) {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    _student2.default.find(function (err, students) {
        if (err) res.send(err);

        res.send(JSON.stringify(students, null, 5));
    });
};

//find certain student by id:
router.findById = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _student2.default.find({ "_id": req.params.id }, function (err, students) {
        if (err) {
            res.send('Student NOT Found!!');
        } else {
            res.send(JSON.stringify(students, null, 5));
        }
    });
};

//find certain student by its name;
router.findByName = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    _student2.default.find({ "name": req.params.name }, function (err, students) {
        if (err) {
            res.send('The student you asked to find is NOT EXIST!!');
        } else {
            res.send(JSON.stringify(students, null, 5));
        }
    });
};

//find certain student which contains certain name elements;
router.containNames = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.name;
    var reg = new RegExp(keyword, 'i');
    _student2.default.find({ 'name': { $regex: reg } }, function (err, students) {
        if (err) {
            res.send('Student NOT Found!!');
        } else {
            res.send(JSON.stringify(students, null, 5));
        }
    });
};

//add student
router.addStudent = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var student = new _student2.default();

    student.name = req.body.name;
    student.studentCategory = req.body.studentCategory;
    student.coursesNumbers = req.body.coursesNumbers;
    student.major = req.body.major;

    student.save(function (err) {
        if (err) {
            res.json({ message: 'Student NOT Added!' });
        } else {

            res.json({ message: 'Student Added Successfully!', data: student });
        }
    });
};

router.changeCategory = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var conditions = { _id: req.params.id },
        update = { studentCategory: req.body.studentCategory };
    var query = { _id: req.params.id };
    _student2.default.update(query, { studentCategory: req.body.studentCategory }, function (err, students) {
        if (err) {
            res.status(404);
            res.json({ message: 'Student NOT Found! ', errmsg: err });
        } else {
            res.json('Category changed successfully!');
        }
    });
};

router.changeMajor = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var conditions = { _id: req.params.id },
        update = { major: req.body.major };
    var query = { _id: req.params.id };
    _student2.default.update(query, { major: req.body.major }, function (err, students) {
        if (err) {
            res.status(404);
            res.json({ message: 'Student NOT Found! ', errmsg: err });
        } else {
            res.json('Major changed successfully!');
        }
    });
};

//delete student by its id;
router.deleteStudentById = function (req, res) {
    _student2.default.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.status(404);
            res.json({ message: 'Cant find Student, Student NOT Deleted!' });
        } else {
            res.json({ message: 'Student Deleted successfully!' });
        }
    });
};

module.exports = router;