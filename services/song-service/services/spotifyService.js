const axios = require('axios');
require('dotenv').config();

const getSpotifyToken = async () => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

    const response = await axios.post(tokenUrl, 'grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data.access_token;
};

const getRecommendations = async (trackId) => {
    const token = await getSpotifyToken();
    const url = `https://api.spotify.com/v1/recommendations?seed_tracks=${trackId}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.tracks;
};

module.exports = { getRecommendations };