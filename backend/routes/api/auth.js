const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../../models/UserModel');
const { checkAuthToken } = require('./../../util/middleware');
const { createJwt } = require('./../../util/jwtHelpers');

const router = express.Router();

// Route: /api/auth

router.post('/signup', async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({username, email, password});
		// Code for sending E-Mail here
		const token = createJwt({ id: user.id });
		res.status(201).json({ token, username: user.username, id: user.id });
	} catch (e) {
		if (e.name === 'ValidationError') {
			const errors = Object.entries(e.errors).map(([_key, value]) => {
				if (value.kind.match('^(unique|required)$')) return [value.path || 'error', value.message]; // Unique Validator
				return [value.path || 'error', value.reason ]; // Custom Error
			});
			return res.status(400).json({errors});
		}
	}
});

router.post('/login', async (req, res) => {
	const { loginId, password } = req.body;

	const errors = [];
	if (!loginId) errors.push(['loginId', 'Missing LoginId']);
	if (!password) errors.push(['password', 'Missing Password']);
	if (errors.length) return res.status(400).json({ errors });

	const loginRegex = new RegExp(`^${loginId}$`, 'i');
	const loginType = loginId.match(/@/) ? 'Email' : 'Username'; 

	let user;

	if (loginType === 'Email') user = await User.findOne({ email: loginRegex });
	else user = await User.findOne({ username: loginRegex });

	if (!user) return res.status(401).send({ errors: [[ 'loginId', 'Invalid Login' ]] });

	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return res.status(401).send({ errors: [[ 'password', 'Invalid Password' ]]});

	const token = createJwt({ id: user.id });
	res.json({ token, id: user.id, username: user.username });
});

router.get('/', checkAuthToken, async (req, res) => {
	const user = await User.findById(req.token.id);
	if (!user) return res.sendStatus(404);
	res.sendStatus(200);
});

module.exports = router;
