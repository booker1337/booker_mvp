const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../../app');
const config = require('./../../config');
const User = require('./../../models/UserModel');
const { loadDatabase } = require('./../../loaders/database');

const api = supertest(app);

beforeAll(async () => {
	await loadDatabase(config.DB_TEST_URI);
	await User.deleteMany({});
	await User.create({
		'username': 'ryan',
		'password': 'test',
		'email': 'ryanname@test.com',
	});
}, 60 * 1000);

describe('Successful User Login', () => {
	test('Username and Password as created', async () => {
		const user = {
			'loginId': 'ryan',
			'password': 'test',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.token).toBeDefined();
	});

	test('Email and password as created', async () => {
		const user = {
			'loginId': 'ryanname@test.com',
			'password': 'test',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.token).toBeDefined();
	});


	test('Username capitalized', async () => {
		const user = {
			'loginId': 'RYAN',
			'password': 'test',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.errors).not.toBeDefined();
		expect(res.body.token).toBeDefined();
	});

	test('Email capitalized', async () => {
		const user = {
			'loginId': 'RYANNAME@TEST.COM',
			'password': 'test',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.token).toBeDefined();
	});
});

describe('Invalid Password', () => {
	test('Wrong Password', async () => {
		const user = {
			'loginId': 'ryanname@test.com',
			'password': 'wrongpassword',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.length).toBe(1);
		expect(res.body.errors[0]).toEqual(['password', 'Invalid Password']);
	});

	test('Password is case sensitive', async () => {
		const user = {
			'loginId': 'ryanname@test.com',
			'password': 'TeSt',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.length).toBe(1);
		expect(res.body.errors[0]).toEqual(['password', 'Invalid Password']);
	});

	test('Password is short', async () => {
		const user = {
			'loginId': 'ryanname@test.com',
			'password': 'te',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.length).toBe(1);
		expect(res.body.errors[0]).toEqual(['password', 'Invalid Password']);
	});
});

describe('Nonexistent User Login', () => {
	test('Nonexistint Username', async () => {
		const user = {
			'loginId': 'nonexistentuser12323',
			'password': 'test',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.length).toBe(1);
		expect(res.body.errors[0]).toEqual(['loginId', 'Invalid Login']);
	});

	test('Nonexistint Email', async () => {
		const user = {
			'loginId': 'nonexistentuser12323@yahoo.com',
			'password': 'test',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.length).toBe(1);
		expect(res.body.errors[0]).toEqual(['loginId', 'Invalid Login']);
	});
});

describe('User Login with missing fields', () => {
	test('Username Missing', async () => {
		const user = {
			'password': 'test',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(400)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.length).toBe(1);
		expect(res.body.errors[0]).toEqual(['loginId', 'Missing LoginId']);
	});

	test('Password Missing', async () => {
		const user = {
			'loginId': 'ryan',
		};

		const res = await api
			.post('/api/auth/login')
			.send(user)
			.expect(400)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.length).toBe(1);
		expect(res.body.errors[0]).toEqual(['password', 'Missing Password']);
	});

	test('Both fields are missing', async () => {
		const res = await api
			.post('/api/auth/login')
			.expect(400);
		
		expect(res.body.errors).toBeDefined();
		expect(res.body.errors.length).toBe(2);
		expect(res.body.errors).toContainEqual(['loginId', 'Missing LoginId']);
		expect(res.body.errors).toContainEqual(['password', 'Missing Password']);
	});
});

afterAll(async () => {
	await User.deleteMany({});
	await mongoose.connection.close();
});
