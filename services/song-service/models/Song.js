const mongoose = require('mongoose');

// Define the schema for a Song document
const songSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    artist: { 
        type: String, 
        required: true 
    },
    lyrics: { 
        type: String 
    },
    identifiedBy: { 
        type: String, 
        enum: ['lyrics', 'audio'], 
        required: true 
    },
    isFavorite: { 
        type: Boolean, 
        default: false 
    },
    identifiedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Export the Song model
module.exports = mongoose.model('Song', songSchema);
