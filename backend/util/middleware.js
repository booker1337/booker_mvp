const config = require('./../config');
const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (req, _res, next) => {
	logger.silly(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
	next();
};

const checkAuthToken = (req, _res, next) => {
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

const errorHandler = (err, req, res, _next) => {
	if (err.name === 'JsonWebTokenError') return res.status(401).json({ errors: ['jwt', 'Invalid JWT'], name: err.name });
	if (err.name === 'ValidationError') {
		const errors = Object.entries(e.errors).map(([_key, value]) => {
			if (value.kind.match('^(unique|required)$')) return [value.path || 'error', value.message]; // Unique Validator
			return [value.path || 'error', value.reason ]; // Custom Error
		});
		return res.status(400).json({errors});
	}
	if (err.errors) return res.status(401).json({ errors: err });
	
	// Add errors here as we find them
	logger.error(`${req.method} ${req.path} - ${JSON.stringify(req.body)}`, err);
	return res.status(400).json({ message: err.message, name: err.name,  err});
};

module.exports = {
	requestLogger,
	checkAuthToken,
	errorHandler,
};
