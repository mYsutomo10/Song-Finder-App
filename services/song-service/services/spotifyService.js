const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://api.spotify.com/v1';

const getRecommendations = async (trackId) => {
    try {
        const response = await axios.get(`${BASE_URL}/recommendations`, {
            headers: {
                Authorization: `Bearer ${process.env.SPOTIFY_API_TOKEN}`,
            },
            params: {
                seed_tracks: trackId, // Seed track ID
                limit: 10,           // Limit results to 10 songs
            },
        });

        return response.data.tracks.map(track => ({
            title: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            previewUrl: track.preview_url, // Optional: link to song preview
            spotifyUrl: track.external_urls.spotify, // Optional: link to Spotify page
        }));
    } catch (err) {
        throw new Error(err.response?.data?.error?.message || 'Failed to fetch recommendations from Spotify');
    }
};

module.exports = { getRecommendations };
