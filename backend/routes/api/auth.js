const config = require('./../../config');
const router = require('express').Router();
const User = require('../../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Route: /api/auth

router.post('/signup', async (req, res) => {
	const { username, email, password } = req.body;
	await User.create({username, email, password});
	// Code for sending E-Mail here
	res.sendStatus(201);
});

router.post('/login', async (req, res) => {
	const { username, email, password } = req.body;
	let user;
	if (email) user = await User.findOne({ email });
	if (username) user = await User.findOne({ username });
	// TODO: prevent early return if user is undefined
	if(!user) return res.status(400).send('invalid username or password');
	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return res.status(400).send('invalid username or password');
	const token = createJwt(user);
	res.json({ token });
});

const createJwt = user => jwt.sign({ user: { _id: user._id } }, config.JWT_SECRET, { expiresIn: '24h' });

module.exports = router;
