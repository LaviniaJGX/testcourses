let courses = require('../models/courses');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Course = require('../models/courses');

var mongodbUri ='mongodb://test:dreammj01@ds151453.mlab.com:51453/testcourses';
mongoose.connect(mongodbUri,{ useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//find all courses in database
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    Course.find(function (err, courses) {
        if (err)
            res.send(err);
        else
            res.send(JSON.stringify(courses, null, 5));
    });
}

//find certain course by id:
router.findById = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Course.find({ "_id":req.params.id},function (err, courses) {
        if (err){
            res.status(404);
            res.send({message:"Invalid id or teacherName,Do not match!"});
        }
        else if ((courses[0].teacherType==="admin")||(courses[0].teacherName===req.params.teacherName)) {
            res.send(JSON.stringify(courses,null,5));
        }
        else if (courses[0].teacherType==="admin") {
            res.send(JSON.stringify(courses,null,5));
        }
        else {
            res.json('You are not the administrant ! You can not see all courses!');
        };
    });

}

function getTotalNumbers(array) {
    let totalNumbers = 0;
    array.forEach(function(obj) { totalNumbers += obj.classHours; });
    return totalNumbers;
}

router.findTotalNumbers = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Course.find(function(err, courses) {
        if (err) {
            res.status(404);
            res.send(err);
        }
        else
            res.json([{ totalNumbers : getTotalNumbers(courses) }]);
    });
}

function getTotalHours(array) {
    let totalHours = 0;
    array.forEach(function(obj) { totalHours += obj.classHours; });
    return totalHours;
}

router.findTotalHours = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Course.find(function(err, courses) {
        if (err){
            res.status(404);
            res.send(err);
        }
        else
            res.json([{ totalHours : getTotalHours(courses) }]);
    });
}

router.findByElements = (req, res) => {
    //fuzzy search
    res.setHeader('Content-Type', 'application/json');
    var keyword = {'courseTitle': {$regex:req.params.courseTitle, $options:'i'}};
    Course.find(keyword, function(err,courses) {
        if (courses.length <= 0) {
            res.status(404);
            res.json({message: 'Course Not Found!!'});
        }
        else
            res.send(JSON.stringify(courses,null,5));
    });
}


function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}
//add course
router.addCourse = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var course = new Course();

    course.courseTitle = req.body.courseTitle;// the requested value
    course.classHours = req.body.classHours;// the requested value
    course.studentNumbers=req.body.studentNumbers;
    course.studentCategory=req.body.studentCategory;
    course.teacherName=req.body.teacherName;
    course.teacherType=req.body.teacherType;

    if((req.body.courseTitle!=null)&&(req.body.classHours!=null)&&(req.body.studentNumbers!=null)&&(req.body.studentCategory!=null)&&(req.body.teacherName!=null)&&(req.body.teacherType!=null)){
        course.save(function(err) {
            if (err)
                res.json({ message: 'Course NOT Added!', errmsg : err});
            // return a suitable error message
            else{
                res.json({ message: 'Course Added Successfully!',data:course});
            }
            // return a suitable success message
        });
    }
    else {
        res.json('Wrong Properties!');
    }
}

router.changeCertainHours =(req,res) => {
    res.setHeader('Content-Type', 'application/json');
    Course.find({ teacherName: req.params.teacherName },function(err, courses){
        if (err){
            res.send(err);
        }else if(courses[0].teacherType==="admin"){
            var conditions = { _id: req.params.id } , update = {  classHours: req.body.classHours };
            var query = { _id: req.params.id };
            Course.updateMany(query, { classHours: req.body.classHours},function (err, courses) {
                //console.log(allCourses);
                if (err){
                    res.status(404);
                    res.json({message:'Course NOT Found! ', errmsg : err});
                }
                else {
                    res.json('ClassHours changed successfully!');
                }
            })
        }
        else {
            res.json({ message:'You have no right!'});
        }
    });

};

router.changeCertainNumbers =(req,res) => {
    res.setHeader('Content-Type', 'application/json');
    Course.find({ teacherName: req.params.teacherName },function(err, courses) {
        if (err){
            res.send(err);
        }else if(courses[0].teacherType==="admin"){
            var query = { _id: req.params.id };
            Course.updateMany(query, { studentNumbers: req.body.studentNumbers},function (err, courses) {
                //console.log(allCourses);
                if (err){
                    res.status(404);
                    res.json({message:'Course NOT Found! ', errmsg : err});
                }
                else {
                    res.json('StudentNumbers changed successfully!');
                }
            })
        }
        else {
            res.json({ message:'You have no right!'});
        }
    });
};

//change teacher
router.changeCertainTeacher =(req,res) => {
    res.setHeader('Content-Type', 'application/json');
    Course.find({ teacherName: req.params.teacherName },function(err, courses) {
        if (err){
            res.send(err);
        }else if(courses[0].teacherType==="admin"){
            var query = { _id: req.params.id };
            Course.updateMany(query, { teacherName: req.body.teacherName},function (err, courses) {
                //console.log(allCourses);
                if (err){
                    res.status(404);
                    res.json({message:'Course NOT Found! ', errmsg : err});
                }
                else {
                    res.json('Teachers changed successfully!');
                }
            })
        }
        else {
            res.json('You have no right!');
        }
    });
};

//delete Course by its id;
router.deleteCourse = (req, res) => {

    Course.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(404);
            res.json({message: 'Course NOT Deleted!', errmsg: err});
        }
        else
            res.json({ message: 'Course Successfully Deleted!'});
    });
}



module.exports = router;