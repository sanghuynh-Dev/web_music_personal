const Music = require('../models/Music');
const Likes = require('../models/Likes');
const { isLiked } = require('../../services/likeService');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class YouController {
    library(req, res, next) {
        res.render('librarys/library');
    }

    likes(req, res, next) {
        Likes.find({ user: req.session.userID })
            .then( async (likes) => {
                const musicIds = likes.map(like => like.target);
                const musics = await Music.find({ _id: { $in: musicIds } });
                const newMusics = await isLiked(req.session.userID, musics);
                const likedCount = await Likes.countDocuments({ user: req.session.userID });

                res.render('librarys/likes', {
                    musics: newMusics,
                    count: likedCount,
                });
            })
            .catch(next);
    }

    async liked(req, res, next) {
        const { target, targetType } = req.body;
        const userId = req.session.userID;
        console.log(userId);
        
        const existed = await Likes.findOne({ user: userId, target, targetType});

        let liked;

        if(existed) {
            await Likes.deleteOne({ _id: existed._id });
            liked = false;
        } else {
            const like = new Likes({ user: userId, target, targetType });
            await like.save();
            liked = true;
        }

        const count = await Likes.countDocuments({ user: userId });

        const songIDLiked = await Likes.find({ user: userId });
        const allSongLiked = await Music.find({ _id: { $in: songIDLiked.map(like => like.target) } });
        console.log(allSongLiked);
        res.json({ liked , allSongLiked , count});
    }
}

// async function isLiked(userId, musics) {
//     const likes = await Likes.find({ user: userId });
//     const likedSongIds = likes.map(like => like.target.toString());
//     return musics.map(song => ({
//         ...song._doc,
//         liked: likedSongIds.includes(song._id.toString())
//     }));
// }

module.exports = new YouController();