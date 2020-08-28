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
	const requestBody = {
		'loginId': 'ryan',
		'password': 'ryan',
	};

	let res = await api
		.post('/api/auth/login')
		.send(requestBody)
		.expect(200)
		.expect('Content-Type', /application\/json/);
	
	expect(res.body.token).toBeDefined();
	expect(res.body.id).toBeDefined();
	const token = res.body.token;

	res = await api
		.get('/api/users/user')
		.set('Authorization', `Bearer ${token}`)
		.expect(200);
	
	const [user] = await User.find({});
	expect(res.body.id).toBe(user._id.toJSON());
	expect(res.body.username).toBe(user.username);
	expect(res.body.email).toBe(user.email);
});

test('User not present', async () => {
	const requestBody = {
		'loginId': 'ryan',
		'password': 'ryan',
	};

	let res = await api
		.post('/api/auth/login')
		.send(requestBody)
		.expect(200)
		.expect('Content-Type', /application\/json/);
	
	expect(res.body.token).toBeDefined();
	expect(res.body.id).toBeDefined();
	const token = res.body.token;

	await User.deleteMany({});

	res = await api
		.get('/api/users/user')
		.set('Authorization', `Bearer ${token}`)
		.expect(404);
	
	expect(res.body.errors).toEqual([[ 'error', 'User not Found' ]]);
});


afterAll(async () => {
	await User.deleteMany({});
	await mongoose.connection.close();
});
