'use strict';

var mongoose = require('mongoose');

var TeacherSchema = new mongoose.Schema({
        name: String,
        teacherType: String,
        teacherGender: String,
        department: String,
        departmentMajor: String
}, { collection: 'teacher' });

module.exports = mongoose.model('Teacher', TeacherSchema);