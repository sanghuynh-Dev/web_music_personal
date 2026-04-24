const Music = require('../models/Music');
const Likes = require('../models/Likes');
const { isLiked } = require('../../services/likeService');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class Homecontroller {
    home(req, res, next) {
        Music.find({})
            .then(async (musics) => {
                const userId = req.session.userID;
                const newMusics = await isLiked(userId, musics);
                const likedCount = await Likes.countDocuments({ user: userId });

                res.render('home', {
                    musics: newMusics,
                    likedMusics: await liked(userId),
                    count: likedCount
                });
            })
            .catch(next);
    }
}

async function liked(userId) {
    const likes = await Likes.find({ user: userId })
    const musicIds = likes.map(like => like.target);
    const musics = await Music.find({ _id: { $in: musicIds } });
    return await isLiked(userId, musics);
}

// async function isLiked(userId, musics) {
//     const likes = await Likes.find({ user: userId });
//     const likedSongIds = likes.map(like => like.target.toString());
//     return musics.map(song => ({
//         ...song._doc,
//         liked: likedSongIds.includes(song._id.toString())
//     }));
// }

module.exports = new Homecontroller();