const config = require('./index');
const mongoose = require('mongoose');
const logger = require('./../util/logger');

mongoose.connect(`${config.DB_URI}&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => logger.info(`Database Connection Established ${mongoose.connection.host}:${mongoose.connection.port}`))
	.catch(e => logger.error(`Error while connecting to Database: ${e}`));
