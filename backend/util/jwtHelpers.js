const jwt = require('jsonwebtoken');
const config = require('../config');

const createJwt = payload => jwt.sign(payload, config.JWT_SECRET, { expiresIn: '24h' });

module.exports = { 
	createJwt,
};
