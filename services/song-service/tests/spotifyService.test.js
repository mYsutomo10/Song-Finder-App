const axios = require('axios');
const { getRecommendations } = require('../services/spotifyService');

jest.mock('axios');

describe('Spotify Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 10 song recommendations for a valid track ID', async () => {
        const trackId = 'track123';
        const mockResponse = {
            data: {
                tracks: [
                    {
                        name: 'Song 1',
                        artists: [{ name: 'Artist 1' }],
                        preview_url: 'https://preview1.mp3',
                        external_urls: { spotify: 'https://spotify.com/track1' },
                    },
                    {
                        name: 'Song 2',
                        artists: [{ name: 'Artist 2' }],
                        preview_url: 'https://preview2.mp3',
                        external_urls: { spotify: 'https://spotify.com/track2' },
                    },
                ],
            },
        };

        axios.get.mockResolvedValue(mockResponse);

        const result = await getRecommendations(trackId);

        expect(result).toEqual([
            {
                title: 'Song 1',
                artist: 'Artist 1',
                previewUrl: 'https://preview1.mp3',
                spotifyUrl: 'https://spotify.com/track1',
            },
            {
                title: 'Song 2',
                artist: 'Artist 2',
                previewUrl: 'https://preview2.mp3',
                spotifyUrl: 'https://spotify.com/track2',
            },
        ]);
        expect(axios.get).toHaveBeenCalledWith(
            'https://api.spotify.com/v1/recommendations',
            {
                headers: { Authorization: `Bearer ${process.env.SPOTIFY_API_TOKEN}` },
                params: {
                    seed_tracks: trackId,
                    limit: 10,
                },
            }
        );
    });

    it('should throw an error if the request fails', async () => {
        const trackId = 'track123';
        axios.get.mockRejectedValue({
            response: { data: { error: { message: 'Invalid track ID' } } },
        });

        await expect(getRecommendations(trackId)).rejects.toThrow('Invalid track ID');
    });
});
