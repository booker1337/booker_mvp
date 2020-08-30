const bcrypt = require('bcrypt');
const express = require('express');

const User = require('../../models/UserModel');
const { checkAuthToken } = require('./../../util/middleware');
const { createJwt } = require('./../../util/jwtHelpers');

const router = express.Router();

// Route: /api/auth

router.post('/signup', async (req, res, next) => {
	const { username, email, password } = req.body;
	const user = await User.create({username, email, password})
		.catch(e => next(e));
	// Code for sending E-Mail here
	const token = createJwt({ id: user.id });
	res.status(201).json({ token, username: user.username, id: user.id });
});

router.post('/login', async (req, res) => {
	const { loginId, password } = req.body;

	// TODO: Middleware for this
	const errors = [];
	if (!loginId) errors.push(['loginId', 'Missing LoginId']);
	if (!password) errors.push(['password', 'Missing Password']);
	if (errors.length) return res.status(400).json({ errors });

	const loginRegex = new RegExp(`^${loginId}$`, 'i');
	const loginObject = loginId.match(/@/) ? { email: loginRegex } : { username: loginRegex }; 
	const user = await User.findOne(loginObject);

	// Alternatives:
	// const user = await User.findOne(loginId.match(/@/) ? { email: loginRegex } : { username: loginRegex });
	// const user = await User.findOne({ $or: [{username: loginRegex}, {email: loginRegex}] });

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
