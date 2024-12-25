const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://api.genius.com';

const searchSongByLyrics = async (lyrics) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: { q: lyrics },
            headers: {
                Authorization: `Bearer ${process.env.GENIUS_API_TOKEN}`,
            },
        });

        const hits = response.data.response.hits;
        if (hits.length === 0) throw new Error('No song found for the given lyrics');

        const topHit = hits[0].result; // Select the top result
        return {
            title: topHit.title,
            artist: topHit.primary_artist.name,
            geniusUrl: topHit.url,
        };
    } catch (err) {
        throw new Error(err.response?.data?.error || 'Failed to fetch song from Genius API');
    }
};

module.exports = { searchSongByLyrics };
