var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
	name:String,
	age:Number,
	hobby:String,
	photo:String
});

module.exports = mongoose.model('Student', studentSchema, 'students');