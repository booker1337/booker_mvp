require('dotenv').config();
const logger = require('./../util/logger');
const crypto = require('crypto');

const NODE_ENV = process.env.NODE_ENV;

logger.info(`Server started in ${NODE_ENV} mode`);

if (!NODE_ENV) logger.error('No NODE_ENV was set!');
if (!process.env.DB_URI) logger.error('DB_URI was not found!');
if (process.env.DB_TEST_URI) logger.error('DB_TEST_URI is now depreciated. DB_URI is now used for all database connections, and you can safely remove this from your .env');
if (!process.env.JWT_SECRET) logger.error(`JWT_SECRET was not found! Generate 64 random bytes such as ${crypto.randomBytes(64).toString('hex')}`);
if (NODE_ENV !== 'test' && !process.env.LOGGER_LEVEL) logger.error('LOGGER_LEVEL was not found!');
if (NODE_ENV !== 'test' && !process.env.BOOKS_API_KEY) logger.error('BOOKS_API_KEY missing!');

const config = {
	PORT: process.env.PORT || 3001,
	DB_URI: process.env.DB_URI || process.env.DB_TEST_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	LOGGER_LEVEL: process.env.LOGGER_LEVEL,
	BOOKS_API_KEY: process.env.BOOKS_API_KEY,
};

logger.silly('Config Settings: ', config);

module.exports = config;
