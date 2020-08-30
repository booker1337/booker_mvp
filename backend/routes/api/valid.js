const express = require('express');
const User = require('../../models/UserModel');

const router = express.Router();

router.get('/isUsernamePresent/:username', async (req, res) => {
	if (req.params.username.length < 3) return res.json({ present: false });
	const users = await User.find({ username: new RegExp(`^${req.params.username}$`, 'i') });
	res.json({ present: !!users.length });
});

router.get('/isEmailPresent/:email', async (req, res) => {
	if (req.params.email.length < 3) return res.json({ present: false });
	const users = await User.find({ email: new RegExp(`^${req.params.email}$`, 'i') });
	res.json({ present: !!users.length });
});

module.exports = router;
