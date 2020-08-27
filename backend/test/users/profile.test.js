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
		.get('/api/users/profile/ryan')
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const [user] = await User.find({});
	expect(res.body.id).toBe(user.id);
	expect(res.body.username).toBe(user.username);
	expect(res.body.email).toBe(user.email);
});

test('User not present', async () => {
	const res = await api
		.get('/api/users/profile/notryan')
		.expect(404)
		.expect('Content-Type', /application\/json/);

	expect(res.body.errors).toEqual([[ 'username', 'No match was found' ]]);
});


afterAll(async () => {
	await User.deleteMany({});
	await mongoose.connection.close();
});
