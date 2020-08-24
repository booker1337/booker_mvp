const router = require('express').Router();
const User = require('../../models/UserModel');
const { checkAuthToken } = require('./../../util/middleware');

// Route: /api/users

router.get('/' , checkAuthToken, async (req, res) => {
	let user = await User.findById(req.token.user._id);
	if (!user) return res.sendStatus(400);
	res.json({ user });
});

module.exports = router;
