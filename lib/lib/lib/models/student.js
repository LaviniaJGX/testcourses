'use strict';

var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
        name: String,
        studentCategory: String,
        coursesNumbers: Number,
        major: String
}, { collection: 'student' });

module.exports = mongoose.model('Student', StudentSchema);