const config = require('./../config');
const fetch = require('node-fetch');
const URL = require('url');
const googleAPI = 'https://www.googleapis.com/books/v1';

const queryBooks = async ({ title='', author='' } = {}) => {
	console.log({title, author});
	const params = new URL.URLSearchParams([
		['q', `intitle:${title}+inauthor:${author}`],
		['key', config.BOOKS_API_KEY],
	]);
	console.log(params.toString());
	const queryURL = `${googleAPI}/volumes?${params.toString()}`;
	return await fetch(queryURL)
		.then(async res => await res.json());
};

module.exports = {
	queryBooks,
};