const config = require('./../../config');
const router = require('express').Router();
const User = require('../../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Route: /api/auth

router.post('/signup', async (req, res) => {
	const { username, email, password } = req.body;
	const user = await User.create({username, email, password});
	// Code for sending E-Mail here
	const token = createJwt({ id: user.id });
	res.status(201).json({ token });
});

router.post('/login', async (req, res) => {
	const { username, email, password } = req.body;
	let user;
	if (email) user = await User.findOne({ email });
	if (username) user = await User.findOne({ username });
	// TODO: prevent early return if user is undefined
	if(!user) return res.status(400).json({ errors: ['Invalid Username or Password'] });
	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return res.status(400).json({ errors: ['Invalid Username or Password'] });
	const token = createJwt({ id: user._id });
	res.json({ token, username: user.username, id: user._id });
});

const createJwt = payload => jwt.sign(payload, config.JWT_SECRET, { expiresIn: '24h' });

module.exports = router;
