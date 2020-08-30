// A Template for route testing
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const config = require('./../config');
const { loadDatabase } = require('../loaders/database');

const api = supertest(app);

beforeAll(async () => {
	await loadDatabase(config.DB_URI);
}, 60 * 1000);

describe('Check if server is running', () => {
	test('GET /api/status', async () => {
		const res = await api
			.get('/api/status')
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(res.body.status).toBe(200);
	});

	test('HEAD /api/status', async () => {
		await api
			.head('/api/status')
			.expect(200);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
