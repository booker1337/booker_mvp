// A Template for route testing
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../../app');
const config = require('./../../config');
const { loadDatabase } = require('../../loaders/database');
const User = require('../../models/UserModel');

const api = supertest(app);

beforeAll(async () => {
	await loadDatabase(config.DB_URI);
	await User.create({
		'email': 'ryan@test.com',
		'username': 'ryan',
		'password': 'ryan',
	});
}, 60 * 1000);

test('User Present', async () => {
	const res = await api
		.get('/api/valid/isUsernamePresent/ryan')
		.expect(200)
		.expect('Content-Type', /application\/json/);

	expect(res.body.present).toBeTruthy();
});

test('User not present', async () => {
	const res = await api
		.get('/api/valid/isUsernamePresent/notryan')
		.expect(200)
		.expect('Content-Type', /application\/json/);

	expect(res.body.present).not.toBeTruthy();
});


afterAll(async () => {
	await User.deleteMany({});
	await mongoose.connection.close();
});
