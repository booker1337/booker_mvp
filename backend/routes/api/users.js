const router = require('express').Router();
const User = require('../../models/UserModel');
const { checkAuthToken } = require('./../../util/middleware');

// Route: /api/users

router.get('/' , checkAuthToken, async (req, res) => {
	let user = await User.findById(req.token.user._id);
	if (!user) return res.status(404).json({ errors: [{ 'error': 'User not Found' }] });
	res.json({ user });
});

module.exports = router;
