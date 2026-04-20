const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    artist: String,
    song_name: String,
    file: String,
    image: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Music', musicSchema);