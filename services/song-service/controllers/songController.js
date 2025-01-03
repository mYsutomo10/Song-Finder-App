const { getRecommendations } = require('../services/spotifyService');
const { searchSongByLyrics } = require('../services/geniusService');
const Song = require('../models/Song');

exports.searchSongByLyrics = async (req, res, next) => {
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

exports.getRecentFound = async (_req, res, _next) => {
    const songs = await Song.find().sort({ identifiedAt: -1 }).limit(10);
    res.json(songs);
};

exports.getSimilarSongs = async (_req, res, next) => {
    try {
        // Placeholder response
        res.json({ success: true, data: [] });
    } catch (error) {
        next(error);
    }
};

exports.getFavorites = async (_req, res, next) => {
    try {
        // Placeholder response
        res.json({ success: true, data: [] });
    } catch (error) {
        next(error);
    }
};

exports.deleteSong = async (req, res, next) => {
    try {
        const songId = req.params.id;
        // You can implement the actual deletion logic here
        res.status(200).json({ success: true, message: `Song with id ${songId} deleted` });
    } catch (error) {
        next(error);
    }
};
