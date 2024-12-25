const axios = require('axios');
const { searchSongByLyrics } = require('../services/geniusService');

jest.mock('axios');

describe('Genius Service', () => {
    it('should return song details for valid lyrics', async () => {
        const lyrics = 'I want to swing from the chandelier';
        const mockResponse = {
            data: {
                response: {
                    hits: [
                        {
                            result: {
                                title: 'Chandelier',
                                primary_artist: { name: 'Sia' },
                                url: 'https://genius.com/Sia-chandelier-lyrics',
                            },
                        },
                    ],
                },
            },
        };

        axios.get.mockResolvedValue(mockResponse);

        const result = await searchSongByLyrics(lyrics);
        expect(result).toEqual({
            title: 'Chandelier',
            artist: 'Sia',
            geniusUrl: 'https://genius.com/Sia-chandelier-lyrics',
        });
    });

    it('should throw an error if no song is found', async () => {
        const lyrics = 'Unknown lyrics';
        const mockResponse = {
            data: {
                response: {
                    hits: [],
                },
            },
        };

        axios.get.mockResolvedValue(mockResponse);

        await expect(searchSongByLyrics(lyrics)).rejects.toThrow(
            'No song found with the given lyrics'
        );
    });
});
