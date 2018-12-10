let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Student = require('../models/student');

var mongodbUri ='mongodb://test:dreammj01@ds151453.mlab.com:51453/testcourses';
mongoose.connect(mongodbUri,{ useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//find all students
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Student.find(function(err, students) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(students,null,5));
    });
}

//find certain student by id:
router.findById = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Student.find({ "_id" : req.params.id },function(err, students) {
        if (err){
            res.send('Student NOT Found!!');
        }
        else{
            res.send(JSON.stringify(students,null,5));
        }
    });
}

//find certain student by its name;
router.findByName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Student.find({ "name" : req.params.name },function(err, students) {
        if (err){
            res.send('The student you asked to find is NOT EXIST!!');
        }
        else{
            res.send(JSON.stringify(students,null,5));
        }
    });
};

//find certain student which contains certain name elements;
router.containNames = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.name;
    var reg=new RegExp(keyword,'i');
    Student.find({'name':{$regex: reg} },function(err, students) {
        if (err){
            res.send('Student NOT Found!!');
        }
        else{
            res.send(JSON.stringify(students,null,5));
        }
    });
}


//add student
router.addStudent = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var student = new Student();

    student.name =  req.body.name;
    student.studentCategory = req.body.studentCategory;
    student.coursesNumbers = req.body.coursesNumbers;
    student.major = req.body.major;

    student.save(function(err) {
        if (err){
            res.json({ message: 'Student NOT Added!'});
        }
        else{

            res.json({ message: 'Student Added Successfully!',data:student});
        }
    });

}

router.changeCategory =(req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var conditions = { _id: req.params.id } , update = {  studentCategory: req.body.studentCategory };
    var query = { _id: req.params.id };
    Student.update(query, { studentCategory: req.body.studentCategory},function (err, students) {
        if (err){
            res.status(404);
            res.json({message:'Student NOT Found! ', errmsg : err});
        }
        else {
            res.json('Category changed successfully!');
        }
    })
}

router.changeMajor =(req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var conditions = { _id: req.params.id } , update = {  major: req.body.major };
    var query = { _id: req.params.id };
    Student.update(query, { major: req.body.major},function (err, students) {
        if (err){
            res.status(404);
            res.json({message:'Student NOT Found! ', errmsg : err});
        }
        else {
            res.json('Major changed successfully!');
        }
    })
}


//delete student by its id;
router.deleteStudentById = (req, res) => {
    Student.findByIdAndRemove(req.params.id, function(err) {
        if (err){
            res.status(404);
            res.json({ message: 'Cant find Student, Student NOT Deleted!'});
        }
        else{
            res.json({ message: 'Student Deleted successfully!'});
        }

    });
}

module.exports = router;
