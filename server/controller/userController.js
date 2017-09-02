const User = require('./../model/user.js'); 
const mongoose = require('./../db/mongoose');

const userController = {
	addUser(req, res, next) {
		const newUser = new User(req.body);
		newUser.save((err, savedUser) => {
			if (err) return res.status(400).send();
			res.cookie('user', savedUser.username);
			res.redirect('/');
		});
	}, 

	verifyUser(req, res, next) {
		User.findOne({username: req.body.username}, (err, result) => {
			if (err) {
				return res.status(400).send();
			}
			if (!result) {
				return res.status(400).send();
			}
			if (result.comparePassword(req.body.password)) {
				res.cookie('user', req.body.username);
				return res.redirect('/');
			}

			return res.status(400).send();
		});
	},

};

module.exports = userController;