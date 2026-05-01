const Music = require('../models/Music');
const Likes = require('../models/Likes');
const User = require('../models/User');
const { following , followers , unFollowing , unFollowers } = require('../../services/followService');
const { isLiked } = require('../../services/likeService');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class YouController {
    library(req, res, next) {
        res.render('librarys/library');
    }

    async following(req, res, next) {
        const userId = req.session.userID;
        if(!userId) return res.redirect('/signIn');
        const user = await User.findById(userId);
        const followings = user.following;
        const userFollowings = await User.find({ _id: { $in: followings } });
        res.render('librarys/following', {
            followings: mutipleMongooseToObject(userFollowings)
        });
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
        
        const existed = await Likes.findOneAndDelete({ user: userId, target, targetType});

        let liked;

        if(existed) {
            // await Likes.deleteOne({ _id: existed._id });
            liked = false;
        } else {
            try {
                const like = new Likes({ user: userId, target, targetType });
                await like.save();
                liked = true;
            } catch (error) {
                liked = true;
            }
        }

        const count = await Likes.countDocuments({ user: userId });

        const songIDLiked = await Likes.find({ user: userId });
        const allSongLiked = await Music.find({ _id: { $in: songIDLiked.map(like => like.target) } });
        console.log(allSongLiked);
        res.json({ liked , allSongLiked , count});
    }

    async followed(req, res, next) {
        try {
            const userCurrent = req.session.userID;     // người follow
            const userTarget = req.params.id;  

            const result = await following(userCurrent, userTarget);

            if(result.modifiedCount === 1) {
                console.log((await result).modifiedCount);

                await followers(userCurrent, userTarget);
            }
        } catch (error) {
            throw error;
        }
       
    };

    async unFollow(req, res, next) {
        try {
            const userCurrent = req.session.userID;     // người follow
            const userTarget = req.params.id;  

            const result = await unFollowing(userCurrent, userTarget);

            if(result.modifiedCount === 1) {
                await unFollowers(userCurrent, userTarget);
            }
        } catch (error) {
            throw error;
        }
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