const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

router.get('/recentfounds', songController.getRecentFound);
router.post('/identify/lyrics', songController.searchSongByLyrics);
router.get('/similarsongs', songController.getSimilarSongs);
router.get('/favorites', songController.getFavorites);
router.delete('/:id', songController.deleteSong);

module.exports = router;
