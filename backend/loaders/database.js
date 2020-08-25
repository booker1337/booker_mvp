const mongoose = require('mongoose');
const logger = require('../util/logger');

const loadDatabase = async (DB_URI) => {
	let dbName;
	if (!process.env.NODE_ENV) throw Error('Missing NODE_ENV environment');
	if (process.env.NODE_ENV.match(/prod/i)) dbName = 'booker-prod';
	else if (process.env.NODE_ENV.match(/dev/i)) dbName = 'booker-dev';
	else if (process.env.NODE_ENV.match(/test/i)) dbName = 'booker-test';

	logger.silly(`Database name: ${dbName}`);

	await mongoose.connect(`${DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName })
		.then(() => logger.info(`Database Connection Established at '${mongoose.connection.host}:${mongoose.connection.port}'`))
		.catch(e => logger.error(`Error while connecting to Database: ${e} (Connection URI: ${DB_URI})`));
};

module.exports = { loadDatabase };
