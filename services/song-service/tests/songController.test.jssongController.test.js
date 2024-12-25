const { getRecentFound } = require('../controllers/songController');
const Song = require('../models/Song');

const mockSongs = [
    { title: 'Song 1', identifiedAt: new Date() },
    { title: 'Song 2', identifiedAt: new Date() },
];

jest.mock('../models/Song', () => ({
    find: jest.fn(() => ({
        sort: jest.fn(() => ({
            limit: jest.fn(() => mockSongs),
        })),
    })),
}));

describe('Song Controller', () => {
    it('getRecentFound should fetch recent songs', async () => {
        const req = {};
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await getRecentFound(req, res, next);

        expect(res.json).toHaveBeenCalledWith(mockSongs);
    });
});
