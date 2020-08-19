const router = require('express').Router();
const User = require('../../models/UserModel');
const { checkAuthToken } = require('./../../util/middleware');

// Route: /api/users

router.use(checkAuthToken);

router.get('/' , async (req, res) => {
	try {
		console.log(req.token);
		let user = await User.findById(req.token.user._id);
		res.json({ user });
	} catch(err) {
		res.status(401).send('1 unauthorized');
	}
});

module.exports = router;
