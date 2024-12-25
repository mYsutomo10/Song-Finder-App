const axios = require('axios');

const BASE_URL = 'https://api.genius.com';
const GENIUS_API_TOKEN = process.env.GENIUS_API_TOKEN;

const searchSongByLyrics = async (lyrics) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            headers: { Authorization: `Bearer ${GENIUS_API_TOKEN}` },
            params: { q: lyrics },
        });

        const song = response.data.response.hits[0]?.result;

        if (!song) throw new Error('No song found with the given lyrics');

        return {
            title: song.title,
            artist: song.primary_artist.name,
            geniusUrl: song.url,
        };
    } catch (err) {
        if (err.message.includes('No song found')) {
            throw err;
        }
        throw new Error('Failed to fetch song from Genius API');
    }
};

module.exports = {
    searchSongByLyrics,
};
