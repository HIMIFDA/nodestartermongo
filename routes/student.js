var Student = require('../models/Student');

module.exports.index = function(req, res) {
	Student.find(function(err, doc) {

		if (err) {
			console.log(err);
		}

		res.render('index/student', {userAuth: req.user, students: doc});	
	});	
};

module.exports.add = function(req, res) {

	res.render('index/student_add', {userAuth: req.user});

};

module.exports.store = function(req, res) {

	//var input = JSON.parse(JSON.stringify(req.body));
	if (req.file != undefined) {
		var inputFile = req.file;
	} else {
		var inputFile = { filename: 'default.jpg' };
	}

	Student.create({
		name: req.body.name,
		age: req.body.age,
		hobby: req.body.hobby,
		photo: inputFile.filename
	}, function(err, student) {
		if (err) {
			res.send(err);
		} else {
			res.redirect('/student');
		}
	});

};

module.exports.edit = function(req, res) {

	var id = req.params.id;

	Student.find({_id: id}, function(err, doc) {
		if (err) {
			console.log(err);
		}
		
		res.render('index/student_edit', {userAuth: req.user, student: doc});	
	});

};

module.exports.update = function(req, res) {

	var id = req.params.id;

	Student.update({_id: id}, 
			{
				$set: {
					name: req.body.name, 
					age: req.body.age, 
					hobby:req.body.hobby
				}
			} , function(err, doc) {
				if (err) {
					console.log(err);
				}
				res.redirect('/student');
		});

};

module.exports.destroy = function(req, res) {
	var id = req.params.id;

	Student.remove({_id: id}, function(err, doc) {
		if (err) {
			console.log(err);
		}
		res.redirect('/student');
	});
};