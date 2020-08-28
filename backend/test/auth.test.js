// A Template for route testing
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const config = require('./../config');
const User = require('../models/UserModel');
const { loadDatabase } = require('../loaders/database');

const api = supertest(app);

beforeAll(async () => {
	await loadDatabase(config.DB_URI);
}, 60 * 1000);

describe('Invalid JWT Format', () => {
	test('No Auth Header', async () => {
		const res = await api
			.get('/api/auth')
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(res.body.errors).toEqual(['jwt', 'Invalid JWT Format']);
	});

	test('Empty Auth Header', async () => {
		const res = await api
			.get('/api/auth')
			.set('Authorization', '')
			.expect(401);

		expect(res.body.errors).toEqual(['jwt', 'Invalid JWT Format']);
	});

	test('Only Bearer', async () => {
		const res = await api
			.get('/api/auth')
			.set('Authorization', 'Bearer')
			.expect(401);

		expect(res.body.errors).toEqual(['jwt', 'Invalid JWT Format']);
	});

	test('Bearer & Random & Invalid Token', async () => {
		const res = await api
			.get('/api/auth')
			.set('Authorization', 'Bearer RandomInvalidJWT')
			.expect(401);

		expect(res.body.errors).toEqual(['jwt', 'Invalid JWT Format']);
	});
});

describe('Invalid JWT', () => {
	test('Random & Invalid Token', async () => {
		const res = await api
			.get('/api/auth')
			.set('Authorization', 'bearer a.b.c')
			.expect(401);

		expect(res.body.errors).toEqual(['jwt', 'Invalid JWT']);
	});

	test('Random & Invalid Token', async () => {
		const res = await api
			.get('/api/auth')
			.set('Authorization', 'Bearer 1.2.3')
			.expect(401);

		expect(res.body.errors).toEqual(['jwt', 'Invalid JWT']);
	});
});

describe('Valid Tokens', () => {
	beforeEach(async () => {
		await User.deleteMany({});
	});

	test('Existing User', async () => {
		const requestBody = {
			'username': 'Ryan',
			'password': 'test',
			'email': 'ryanname@test.com',
		};

		let res = await api
			.post('/api/auth/signup')
			.send(requestBody)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.token).toBeDefined();
		expect(res.body.id).toBeDefined();
		const token = res.body.token;

		const decodedToken = jwt.verify(token, config.JWT_SECRET);
		expect(decodedToken.id).toBe(res.body.id);

		res = await api
			.get('/api/auth')
			.set('Authorization', `Bearer ${token}`)
			.expect(200);
	});

	test('Deleted User', async () => {
		const requestBody = {
			'username': 'Ryan',
			'password': 'test',
			'email': 'ryanname@test.com',
		};

		let res = await api
			.post('/api/auth/signup')
			.send(requestBody)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.token).toBeDefined();
		expect(res.body.id).toBeDefined();
		const token = res.body.token;

		await User.deleteOne({ _id: res.body.id });

		res = await api
			.get('/api/auth')
			.set('Authorization', `Bearer ${token}`)
			.expect(404);
	});

	test('Different Secret', async () => {
		const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
		await api
			.get('/api/auth')
			.set('Authorization', `Bearer ${token}`)
			.expect(401);
	});
});


afterAll(async () => {
	await mongoose.connection.close();
});
