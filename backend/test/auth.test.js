const config = require('./../config');
const { loadDatabase } = require('../loaders/database');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const api = supertest(app);

beforeAll(async () => {
	await loadDatabase(config.DB_TEST_URI);
	await User.deleteMany({});
}, 30 * 1000); // Allow 30 seconds for database to connect, Atlas takes a while

describe('User Signup', () => {
	afterEach(async () => {
		await User.deleteMany({});
	});

	test('With Valid Fields', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'test',
				'email': 'ryanname@test.com',
			})
			.expect(201)
			.expect('Content-Type', /application\/json/);
		
		const token = jwt.verify(res.body.token, config.JWT_SECRET);
		expect(token).toBeDefined();
		const users = await User.find();
		expect(users.length).toBe(1);
		expect(users[0].verified).toBeFalsy();
		expect(token.id).toBe(users[0]._id.toString());
		expect(res.body.errors).not.toBeDefined();
	});

	test('With Missing Email', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'test',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Missing Email Field');
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(0);
	});

	test('With Missing Username', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'password': 'test',
				'email': 'ryanname@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Missing Username Field');
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(0);
	});

	test('With Missing Password', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'email': 'ryanname@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Missing Password Field');
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(0);
	});
});

describe('User Signup with pre-Existing User', () => {
	beforeAll(async () => {
		await User.create({
			'username': 'ryan',
			'password': 'test',
			'email': 'ryanname@test.com',
		});
	});

	afterAll(async () => {
		await User.deleteMany({});
	});

	test('With Existing Email', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'seconduser',
				'password': 'test',
				'email': 'ryanname@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Email is already registered!');
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(1);
	});

	test('With Existing Username', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'test',
				'email': 'seconduser@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);
		
		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Username is already registered!');
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(1);
	});
});

describe('User Signup with invalid Fields', () => {

	test('With Invalid Email', async () => {
		let res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'test',
				'email': 'ryanname',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Invalid Email');
		expect(res.body.errors.length).toBe(1);

		res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'test',
				'email': 'ry@',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Invalid Email');
		expect(res.body.errors.length).toBe(1);

		res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'test',
				'email': '@y',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Invalid Email');
		expect(res.body.errors.length).toBe(1);


		const users = await User.find();
		expect(users.length).toBe(0);
	});

	test('With Invalid Username', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ry',
				'password': 'test',
				'email': 'ryanname@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Invalid Username');
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(0);
	});

	test('With Invalid Password', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'te',
				'email': 'ryanname@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContain('Invalid Password');
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(0);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});

