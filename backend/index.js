<<<<<<< HEAD
const path = require('path')
const config = require('./config');
const logger = require('./util/logger');
const express = require('express');
<<<<<<< HEAD
<<<<<<< HEAD
const { requestLogger } = require('./util/middleware');
=======
>>>>>>> 86798042af81d12e05d4ec3ec1952597538df15f
=======
>>>>>>> 54bf0958472e324395168c614223f303908fd760
const app = express();
require('express-async-errors');
const { requestLogger, errorHandler } = require('./util/middleware');

const cors = require('cors');

require('./config/database');

=======
>>>>>>> 742e9d95734bf5ced943ab46ce94348b0e00ade3
process.on('unhandledRejection', e => {
	logger.error(e);
	process.exit(1);
});

const http = require('http');
const config = require('./config');
const logger = require('./util/logger');
const app = require('./app');
const { loadDatabase } = require('./loaders/database');

const main = async () => {
	const server = http.createServer(app);
	
	await loadDatabase(`${config.DB_URI}&w=majority`);

	server.listen(config.PORT, () => logger.info(`Server running on ${config.PORT}`));
};

main();