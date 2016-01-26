var Profile = require('../models/Profile');

module.exports.index = function(req, res) {
	res.render('index/profile/index', {userAuth: req.user});
}

module.exports.store = function(req, res) {
	var user_id = req.user.id;

	Profile.create({
		_user_id: user_id,
		full_name: req.body.full_name,
		address: req.body.address
	}, function(err, profile) {
		if (err) {
			res.send(err);
		} else {
			res.redirect('/profile');
		}
	});

}