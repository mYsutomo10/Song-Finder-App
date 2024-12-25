const { getRecentFound } = require('../controllers/songController');
const Song = require('../models/Song');

jest.mock('../models/Song'); // Mock the Song model

describe('Song Controller', () => {
    it('getRecentFound should fetch recent songs', async () => {
        const mockSongs = [{ title: 'Test Song', artist: 'Test Artist' }];
        Song.find.mockResolvedValue(mockSongs);

        const req = {};
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await getRecentFound(req, res, next);

        expect(res.json).toHaveBeenCalledWith(mockSongs);
    });
});
