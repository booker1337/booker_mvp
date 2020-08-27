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
}, 60 * 1000); // Allow 60 seconds for database to connect, Atlas takes ages to connect

describe('Normal User Signup', () => {
	beforeAll(async () => {
		await User.deleteMany({});
	});

	afterAll(async () => {
		await User.deleteMany({});
	});

	test('With Valid Fields', async () => {
		const requestBody = {
			'username': 'Ryan',
			'password': 'test',
			'email': 'ryanname@test.com',
		};

		const res = await api
			.post('/api/auth/signup')
			.send(requestBody)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		// Make sure no errors occurred
		expect(res.body.errors).not.toBeDefined();

		// Check if token exists
		const token = jwt.verify(res.body.token, config.JWT_SECRET);
		expect(token).toBeDefined();

		// Check if token matches user details
		const users = await User.find({});
		expect(users.length).toBe(1);

		// Ensure database is as we expect
		expect(users[0].username).toBe(requestBody.username);
		expect(users[0].username).not.toBe(requestBody.username.toLowerCase());
		expect(users[0].username).not.toBe(requestBody.username.toUpperCase());
		expect(users[0].username.match(/[A-Z0-9]\S+/)).toBeTruthy();

		expect(users[0].email).toBe(requestBody.email);
		expect(users[0].email).not.toBe(requestBody.email.toUpperCase());
		expect(users[0].verified).toBeFalsy();

		// Check if token matches the user ID
		expect(token.id).toBe(users[0]._id.toString());
	});
});

describe('User Signup with Missing Fields', () => {
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
		expect(res.body.errors).toEqual([['email', 'Missing Email Field']]);
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
		expect(res.body.errors).toEqual([['username', 'Missing Username Field']]);
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
		expect(res.body.errors).toEqual([['password', 'Missing Password Field']]);
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(0);
	});

	test('With Missing Everything', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['username', 'Missing Username Field']);
		expect(res.body.errors).toContainEqual(['email', 'Missing Email Field']);
		expect(res.body.errors).toContainEqual(['password', 'Missing Password Field']);
		expect(res.body.errors).toContainEqual({'username': 'Missing Username Field'});
		expect(res.body.errors).toContainEqual({'email': 'Missing Email Field'});
		expect(res.body.errors).toContainEqual({'password': 'Missing Password Field'});
		expect(res.body.errors.length).toBe(3);
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
		expect(res.body.errors).toContainEqual(['email', 'Email is already registered!']);
		expect(res.body.errors).toEqual([{'email': 'Email is already registered!'}]);
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(1);
	});

	test('With Existing Email Case Insensitive', async () => {
		let res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'seconduser',
				'password': 'test',
				'email': 'RYANNAME@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['email', 'Email is already registered!']);
		expect(res.body.errors).toEqual([{'email': 'Email is already registered!'}]);
		expect(res.body.errors.length).toBe(1);
		let users = await User.find();
		expect(users.length).toBe(1);

		res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'seconduser',
				'password': 'test',
				'email': 'RYANNAME@TEST.COM',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['email', 'Email is already registered!']);
		expect(res.body.errors).toEqual([{'email': 'Email is already registered!'}]);
		expect(res.body.errors.length).toBe(1);
		users = await User.find();
		expect(users.length).toBe(1);

		res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'seconduser',
				'password': 'test',
				'email': 'ryanNamE@tEsT.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['email', 'Email is already registered!']);
		expect(res.body.errors.length).toBe(1);
		users = await User.find();
		expect(users.length).toBe(1);
	});

	test('With Existing Username', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'test',
				'email': 'ryanname2@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['username', 'Username is already registered!']);
		expect(res.body.errors).toEqual([{'username': 'Username is already registered!'}]);
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(1);
	});

	test('With Existing Username Case Insensitive', async () => {
		let res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'Ryan',
				'password': 'test',
				'email': 'ryanname2@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['username', 'Username is already registered!']);
		expect(res.body.errors).toEqual([{'username': 'Username is already registered!'}]);
		expect(res.body.errors.length).toBe(1);
		let users = await User.find();
		expect(users.length).toBe(1);

		res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'RYAN',
				'password': 'test',
				'email': 'ryanname2@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['username', 'Username is already registered!']);
		expect(res.body.errors.length).toBe(1);
		users = await User.find();
		expect(users.length).toBe(1);

		res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'rYAn',
				'password': 'test',
				'email': 'ryanname2@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['username', 'Username is already registered!']);
		expect(res.body.errors).toEqual([{'username': 'Username is already registered!'}]);
		expect(res.body.errors.length).toBe(1);
		users = await User.find();
		expect(users.length).toBe(1);
	});

	test('With Existing Username and Email', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'ryan',
				'password': 'test',
				'email': 'ryanname@test.com',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
    
		expect(res.body.errors).toContainEqual(['username', 'Username is already registered!']);
		expect(res.body.errors).toContainEqual(['email', 'Email is already registered!']);
		expect(res.body.errors.length).toBe(2);
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
		expect(res.body.errors).toContainEqual(['email', 'Invalid Email']);
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
		expect(res.body.errors).toContainEqual(['email', 'Invalid Email']);
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
		expect(res.body.errors).toContainEqual(['email', 'Invalid Email']);
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
		expect(res.body.errors).toContainEqual(['username', 'Invalid Username']);
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
		expect(res.body.errors).toContainEqual(['password', 'Invalid Password']);
		expect(res.body.errors.length).toBe(1);
		const users = await User.find();
		expect(users.length).toBe(0);
	});

	test('With Invalid Everything', async () => {
		const res = await api
			.post('/api/auth/signup')
			.send({
				'username': 'rn',
				'password': 'te',
				'email': 'invalidemail',
			})
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(res.body.token).not.toBeDefined();
		expect(res.body.errors).toContainEqual(['password', 'Invalid Password']);
		expect(res.body.errors).toContainEqual(['username', 'Invalid Username']);
		expect(res.body.errors).toContainEqual(['email', 'Invalid Email']);
		expect(res.body.errors.length).toBe(3);
		const users = await User.find();
		expect(users.length).toBe(0);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
