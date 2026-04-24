const Likes = require('../app/models/Likes');

async function isLiked(userId, musics) {
    const likes = await Likes.find({ user: userId });
    const likedSongIds = likes.map(like => like.target.toString());
    return musics.map(song => ({
        ...song._doc,
        liked: likedSongIds.includes(song._id.toString()),
    }));
}

module.exports = { isLiked };