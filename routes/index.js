
module.exports.home = function(req, res) {
	res.render('index/home', {userAuth: req.user});
}

module.exports.about = function(req, res) {
	res.render('index/about', {userAuth: req.user});
}