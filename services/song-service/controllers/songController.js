const { getRecommendations } = require('../services/spotifyService');
const { searchSongByLyrics } = require('../services/geniusService');
const Song = require('../models/Song');

exports.identifySongByLyrics = async (req, res, next) => {
    try {
        const { lyrics } = req.body;
        const identifiedSong = await searchSongByLyrics(lyrics);

        const song = new Song({
            title: identifiedSong.title,
            artist: identifiedSong.artist,
            lyrics,
            identifiedBy: 'lyrics',
        });

        await song.save();
        res.status(201).json({
            ...song.toObject(),
            geniusUrl: identifiedSong.geniusUrl, // Include Genius link
        });
    } catch (err) {
        next(err);
    }
};

exports.getRecommendations = async (req, res, next) => {
    try {
        const { trackId } = req.query;
        if (!trackId) return res.status(400).json({ error: 'Track ID is required' });

        const recommendations = await getRecommendations(trackId);
        res.json(recommendations);
    } catch (err) {
        next(err);
    }
};
