const User = require('./../model/user.js'); 
const mongoose = require('./../db/mongoose');

const userController = {
	addUser(req, res, next) {
		const newUser = new User(req.body);
		newUser.save((err, savedUser) => {
			if (err) return res.status(400).send();
			res.cookie({user: req.body.username});
			res.redirect('/');
		});
	}, 

	verifyUser(req, res, next) {
		User.findOne({username: req.body.username}, (err, result) => {
			console.log('result is', result);
			if (err) {
				console.log('pwd err');
				return res.status(400).send();
			}
			if (!result) {
				console.log('no result');
				return res.status(400).send();
			}
			if (result.comparePassword(req.body.password)) {
				res.cookie('user', req.body.username);
				res.locals.test = 'test';
				return res.redirect('/');
			}
			return res.status(400).send();
		});
	},

	checkCookie(req, res, next) {
		console.log('cookies are', req.cookies)
		//console.log('locals are', res.locals.test);
		if (req.cookies.user) return next();
		console.log('cookie failed'); 
		return res.redirect('/login');
	},



};

module.exports = userController;