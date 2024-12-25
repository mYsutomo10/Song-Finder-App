const request = require('supertest');
const express = require('express');
const songRoutes = require('../routes/songRoutes');

const app = express();
app.use(express.json());
app.use('/songs', songRoutes);

describe('Song Routes', () => {
    it('GET /songs/recentfounds should return 200', async () => {
        const res = await request(app).get('/songs/recentfounds');
        expect(res.statusCode).toBe(200);
    });
});
