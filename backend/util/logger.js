const chalk = require('chalk');

module.exports = {
	silly: (...params) => {
		if (process.env.NODE_ENV === 'test') return;
		if (!process.env.LOGGER_LEVEL.match(/^silly$/i)) return;
		console.log(...params);
	},
	info: (...params) => {
		if (process.env.NODE_ENV === 'test') return;
		if (!process.env.LOGGER_LEVEL.match(/^(|info|silly)$/i)) return;
		console.log(...params);
	},
	error: (...params) => {
		if (!process.env.LOGGER_LEVEL.match(/^(|silly|info|error)$/i) && process.env.NODE_ENV !== 'test') return;
		console.error(chalk.bgRed.black(...params));
	},
};
