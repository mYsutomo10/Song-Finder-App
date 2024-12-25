const request = require('supertest');
const app = require('../app'); // Ensure this points to your Express app

jest.setTimeout(15000); // Increase timeout for long-running tests

describe('Song Routes', () => {
    it('GET /songs/recentfounds should return 200', async () => {
        const res = await request(app).get('/songs/recentfounds');
        expect(res.statusCode).toBe(200);
    });
});

jest.mock('../models/Song', () => ({
    find: jest.fn(() => ({
        sort: jest.fn(() => ({
            limit: jest.fn(() => [
                { title: 'Mock Song 1', identifiedAt: new Date() },
                { title: 'Mock Song 2', identifiedAt: new Date() },
            ]),
        })),
    })),
}));
