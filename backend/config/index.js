require('dotenv').config();
const logger = require('./../util/logger');
const crypto = require('crypto');

if (process.env.NODE_ENV !== 'test' && !process.env.DB_URI) logger.error('DB_URI was not found!');
if (!process.env.DB_TEST_URI) logger.error('DB_TEST_URI was not found!');
if (!process.env.JWT_SECRET) logger.error(`JWT_SECRET was not found! Generate 64 random bytes such as ${crypto.randomBytes(64).toString('hex')}`);
if (!process.env.LOGGER_LEVEL) logger.error('LOGGER_LEVEL was not found! It will be set to \'INFO\' by default.');


const config = {
	PORT: process.env.PORT || 3001,
	DB_URI: process.env.DB_URI,
	DB_TEST_URI: process.env.DB_TEST_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'info',
};

logger.silly({ config });

module.exports = config;
