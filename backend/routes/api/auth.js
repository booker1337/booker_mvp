const config = require('./../../config');
const router = require('express').Router();
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
	const { username, name, password } = req.body;
	const user = await User.create({username, name, password});
	res.status(201).json(user);
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	let user = await User.findOne({ username });
	if(!user) return res.status(400).send('invalid username or password');
	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) return res.status(400).send('invalid username or password');
	const token = createJwt(user);
	res.json({ token });
});

const createJwt = user => jwt.sign({ user: { _id: user._id } }, config.JWT_SECRET, { expiresIn: '24h' });

module.exports = router;
