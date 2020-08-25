const chalk = require('chalk');

const LOGGER_LEVEL = process.env.LOGGER_LEVEL;

module.exports = {
	silly: (...params) => {
		if (process.env.NODE_ENV === 'test') return;
		if (LOGGER_LEVEL && !LOGGER_LEVEL.match(/(|silly)/i)) return;
		console.log(...params);
	},
	info: (...params) => {
		if (process.env.NODE_ENV === 'test') return;
		if (LOGGER_LEVEL && !LOGGER_LEVEL.match(/(|info|silly)/i)) return;
		console.log(...params);
	},
	error: (...params) => {
		console.error(chalk.bgRed.black(...params));
	},
};