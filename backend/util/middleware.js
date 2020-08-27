const config = require('./../config');
const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (req, _res, next) => {
	logger.silly(`${req.method} ${req.path} ${JSON.stringify(req.body)}`);
	next();
};

const checkAuthToken = (req, res, next) => {
	const authorization = req.get('authorization');
	if (!/^bearer \S+\.\S+\.\S+$/i.test(authorization)) {
		return res.status(401).json({ errors: ['jwt', 'Invalid JWT Format'], authorization});
	}
	
	const [, token] = authorization.split(' ');
	try {

		req.token = jwt.verify(token, config.JWT_SECRET);
		next();
	} catch (e) {
		res.status(401).json({ errors: ['jwt', 'Invalid JWT']});
	}
};

// Removing _next will cause error middleware not to function
const errorHandler = (err, req, res, _next) => {

	if (err.name === 'ValidationError') {
		const errors = Object.entries(err.errors).map(([_key, value]) => {
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
