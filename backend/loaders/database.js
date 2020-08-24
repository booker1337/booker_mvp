const mongoose = require('mongoose');
const logger = require('../util/logger');

const loadDatabase = async (DB_URI) => {
	await mongoose.connect(`${DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
		.then(() => logger.info(`Database Connection Established ${mongoose.connection.host}:${mongoose.connection.port}`))
		.catch(e => logger.error(`Error while connecting to Database: ${e} (Connection URI: ${DB_URI})`));
};

module.exports = { loadDatabase };
