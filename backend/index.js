const config = require('./config');
const logger = require('./util/logger');

const http = require('http');
const app = require('./app');

const server = http.createServer(app);

process.on('unhandledRejection', e => {
	logger.error(e);
	process.exit(1);
});

server.listen(config.PORT, () => logger.info(`Server running on ${config.PORT}`));
