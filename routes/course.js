var Course = require('../models/Course');
var Student = require('../models/Student');

module.exports.index = function(req, res) {

	Student.find(function(err, doc) {
		if (err) {
			console.log(err);
		}

		Course.find().populate('_student_id').exec(function(err, course) {
			if (err) {
				res.send(err);
			} else {
				res.render('index/course/index', {userAuth: req.user, students: doc, courses: course});
			}
		});

	})

}

module.exports.store = function(req, res) {

	Course.create({
		_student_id: req.body.student_id,
		course: req.body.course
	}, function(err, course) {
		if (err) {
			res.send(err);
		} else {
			res.redirect('/course');
		}
	});

}

module.exports.edit = function(req, res) {

	var _id = req.params._id;

	Student.find(function(err, doc) {
		if (err) {
			console.log(err);
		}

		Course.findOne({_id: _id}).populate('_student_id').exec(function(err, course) {
			if (err) {
				res.send(err);
			} else {
				res.render('index/course/edit', {userAuth: req.user, students: doc, course: course});
			}
		});

	})

}

module.exports.update = function(req, res) {
	var id = req.params.id;

	Course.update({_id: id},
		{
			$set: {
				_student_id: req.body.student_id,
				course: req.body.course
			}
		}, function(err, doc) {
			if (err) {
				res.send(err);
			}

			res.redirect('/course');
		}
	)

}

