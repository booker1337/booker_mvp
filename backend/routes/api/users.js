const router = require('express').Router();
const User = require('../../models/UserModel');
const { checkAuthToken } = require('./../../util/middleware');

// Route: /api/users


router.get('/:id' , checkAuthToken, async (req, res) => {
	let user = await User.findById(req.token.user.id);
	if (!user) return res.status(404).json({ errors: [{ 'error': 'User not Found' }] });
	res.json({ user });
});

router.get('/profile/:username', async (req, res) => {
	const user = await User.findOne({ username: new RegExp(`^${req.params.username}$`, 'i') });
	if (!user) return res.status(404).json({ errors: [{ 'username': 'No match was found' }]});
	res.json(user);
});

module.exports = router;
