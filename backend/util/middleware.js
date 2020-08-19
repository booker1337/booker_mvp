const config = require('./../config');
const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (req, res, next) => {
	logger.silly(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
	next();
};

const checkAuthToken = (req, res, next) => {
	try {
		const authorization = req.get('authorization');
		const [bearer, token] = authorization.split(' ');
		if (!bearer.match(/^bearer$/i)) throw new Error();
		req.token = jwt.verify(token, config.JWT_SECRET);
		next();
	} catch (e) {
		throw new jwt.JsonWebTokenError('Invalid Token');
	}
};

const errorHandler = (err, req, res) => {
	if (err.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid JWT'});
	
	// Add errors here while we find them
	logger.error(`${req.method} ${req.path} - ${JSON.stringify(req.body)}`, err);
	res.status(500).json({ error: err.message, errorname: err.name });
};

module.exports = {
	requestLogger,
	checkAuthToken,
	errorHandler,
};
