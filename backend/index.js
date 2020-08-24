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