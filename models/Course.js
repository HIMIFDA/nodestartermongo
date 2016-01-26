var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
	_student_id: {type: String, ref: 'Student'},
	course: String,
});

module.exports = mongoose.model('Course', courseSchema, 'courses');