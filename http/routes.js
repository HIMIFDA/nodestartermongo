var Index = require('../routes/index');
var Student = require('../routes/student');
var Register = require('../routes/register');
var Login = require('../routes/login');

module.exports = function(app, upload, passport) {

	app.get('/', isLoggedIn, Index.home);
	app.get('/about', isLoggedIn, Index.about);	
	app.get('/student', isLoggedIn, Student.index);
	app.get('/student/add', isLoggedIn, Student.add);
	app.post('/student/store', isLoggedIn, upload.single('photo'), Student.store);
	app.get('/student/edit/:id', isLoggedIn, Student.edit);	
	app.post('/student/update/:id', isLoggedIn, Student.update);
	app.get('/student/destroy/:id', isLoggedIn, Student.destroy);

	app.get('/login', isGuest, Login.index);
	app.post('/do/login', passport.authenticate('local-login', {
	        successRedirect : '/', // redirect to the secure profile section
	        failureRedirect : '/login', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));

	app.get('/register', isGuest, Register.index);
	app.post('/do/register', passport.authenticate('local-signup', {
	        successRedirect : '/', // redirect to the secure profile section
	        failureRedirect : '/register', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));


	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

}





// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

// route middleware to make sure a user is guest
function isGuest(req, res, next) {

	// if user is not authenticated in the session, carry on
	if (req.isUnauthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}