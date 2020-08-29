const express = require('express');
// const { checkAuthToken } = require('./../../util/middleware');
const { queryBooks } = require('../../services/bookService');

const router = express.Router();

// Route: /api/books

router.get('/volumes', async (req, res) => {
	console.log(req.query);
	let data = await queryBooks(req.query);
	console.log(data);
	res.json(data);
});

module.exports = router;
