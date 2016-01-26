var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
	_user_id: {type: String, ref: 'User'},
	full_name: String,
	address: String,
});

module.exports = mongoose.model('Profile', profileSchema, 'profiles');