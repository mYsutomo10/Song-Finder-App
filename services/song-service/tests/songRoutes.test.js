const request = require('supertest');
const express = require('express');
const songRoutes = require('../routes/songRoutes');
const songController = require('../controllers/songController');

const app = express();
app.use(express.json());
app.use('/songs', songRoutes);

jest.setTimeout(10000);

describe('Song Routes', () => {
    it('GET /songs/recentfounds should return 200', async () => {
        const res = await request(app).get('/songs/recentfounds');
        expect(res.statusCode).toBe(200);
    });
});

jest.mock('../controllers/songController', () => ({
    getRecentFound: jest.fn(),
    searchSongByLyrics: jest.fn(),
    identifySongByAudio: jest.fn(),
    getSimilarSongs: jest.fn(),
    getFavorites: jest.fn(),
    deleteSong: jest.fn(),
}));
