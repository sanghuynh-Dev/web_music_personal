const Likes = require('../app/models/Likes');
const Music = require('../app/models/Music');

async function isLiked(userId) {

    const musics = await Music.find({}).lean();

    const likedDocs = await Likes.find({ user: userId }).lean();
    const likedSet = new Set(
        likedDocs.map(like => like.target.toString())
    );
    return musics.map(song => ({
        ...song,
        liked: likedSet.has(song._id.toString()),
    }));
}


async function songLiked(userId) {
    const likes = await Likes.find({ user: userId })
    const musicIds = likes.map(like => like.target);
    const musics = await Music.find({ _id: { $in: musicIds } }).lean();
    return musics;
}

module.exports = { isLiked , songLiked };