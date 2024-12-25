const mongoose = require('mongoose');
const Song = require('../models/Song');

describe('Song Model', () => {
    it('should validate a valid Song schema', () => {
        const validSong = new Song({
            title: 'Test Song',
            artist: 'Test Artist',
            lyrics: 'Some lyrics here',
            identifiedBy: 'lyrics',
            isFavorite: true,
        });

        const validationError = validSong.validateSync();
        expect(validationError).toBeUndefined();
    });

    it('should throw a validation error for missing title', () => {
        const invalidSong = new Song({
            artist: 'Test Artist',
            identifiedBy: 'lyrics',
        });

        const validationError = invalidSong.validateSync();
        expect(validationError.errors.title).toBeDefined();
    });
});
