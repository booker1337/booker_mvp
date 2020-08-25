const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../../models/UserModel');
const { checkAuthToken } = require('./../../util/middleware');
const { createJwt } = require('./../../util/jwtHelpers');

const router = express.Router();

// Route: /api/auth

router.post('/signup', async (req, res) => {
	const { username, email, password } = req.body;
	const user = await User.create({username, email, password});
	// Code for sending E-Mail here
	const token = createJwt({ id: user.id });
	res.status(201).json({ token });
});

router.post('/login', async (req, res) => {
	const { loginId, password } = req.body;

	const loginRegex = new RegExp(`^${req.params.email}$`, 'i');
	const loginType = loginId.match(/@/) ? 'Email' : 'Username'; 
	let user;
	if (loginType === 'Email') user = await User.findOne({ email: loginRegex });
	else user = await User.findOne({ username: loginRegex });

	if (!user) return res.status(400).send({ errors: [{ loginId: `Invalid ${loginType}` } ]});

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return res.status(400).send({ errors: [{ password: 'Invalid Password' }] });
	const token = createJwt({ id: user.id });
	res.json({ token, id: user.id, username: user.username });
});

module.exports = router;
