'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var courses = require("./routes/courses");
var teacher = require("./routes/teacher");
var student = require("./routes/student");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(cors());

// Our Courses Web App Routes
app.get('/courses', courses.findAll);
app.get('/courses/:id', courses.findById);
app.get('/coursesNumbers/numbers', courses.findTotalNumbers);
app.get('/coursesHours/hours', courses.findTotalHours);
app.get('/coursesElements/:courseTitle', courses.findByElements);

app.get('/teacher', teacher.findAll);
app.get('/teacher/:id', teacher.findById);
app.get('/teacherName/:name', teacher.findByName);
app.get('/teacherElements/:department', teacher.containNames);

app.get('/student', student.findAll);
app.get('/student/:id', student.findById);
app.get('/studentName/:name', student.findByName);
app.get('/studentElements/:name', student.containNames);

app.post('/courses', courses.addCourse);
app.post('/teacher', teacher.addTeacher);
app.post('/student', student.addStudent);

//app.put('/coursesHours/:courseTitles/:teacherName/Hour', courses.changeClassHours);
//app.put('/coursesNumbers/:courseTitles/:teacherName/StuNum', courses.changeStudentNumbers);
app.put('/coursesCertain/:id/:teacherName/CHour', courses.changeCertainHours);
app.put('/coursesCerNum/:id/:teacherName/CNum', courses.changeCertainNumbers);
app.put('/courses/:id/:teacherName/Teacher', courses.changeCertainTeacher);
app.put('/courses/:id', courses.changeCourses);

app.put('/teacher/:id', teacher.changeCertainDepartment);
app.put('/teacherMajor/:id', teacher.changeCertainMajor);
app.put('/student/:id', student.changeCategory);
app.put('/studentMajor/:id', student.changeMajor);

app.delete('/courses/:id', courses.deleteCourse);
app.delete('/teacher/:id', teacher.deleteTeacherById);
app.delete('/student/:id', student.deleteStudentById);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

if (app.get('env') === 'dev') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

module.exports = app;