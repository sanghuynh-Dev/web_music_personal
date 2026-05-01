const Likes = require('../app/models/Likes');
const Music = require('../app/models/Music');

async function isLiked(userId, musics) {
    const likes = await Likes.find({ user: userId });
    const likedSongIds = likes.map(like => like.target.toString());
    return musics.map(song => ({
        ...song._doc,
        liked: likedSongIds.includes(song._id.toString()),
    }));
}

async function liked(userId) {
    const likes = await Likes.find({ user: userId })
    const musicIds = likes.map(like => like.target);
    const musics = await Music.find({ _id: { $in: musicIds } });
    return await isLiked(userId, musics);
}

module.exports = { isLiked , liked };