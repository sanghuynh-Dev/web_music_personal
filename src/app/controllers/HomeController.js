const Music = require('../models/Music');
const Likes = require('../models/Likes');
const User = require('../models/User');
const { isLiked , songLiked } = require('../../services/likeService');
const { isFollowing } = require('../../services/followService');
const { mutipleMongooseToObject,mongooseToObject } = require('../../util/mongoose');
const { get } = require('mongoose');


class Homecontroller {
    async home(req, res, next) {
        const userId = req.session.userID;
        const users = await User.find({});

        const newUsers = await isFollowing(userId);
        console.log(newUsers);

        const newMusics = await isLiked(userId);
        const countLiked = await Likes.countDocuments({ user: userId });

        res.render('home', {
            musics: newMusics,
            users: userId ? newUsers : mutipleMongooseToObject(users),
            likedMusics: await songLiked(userId),
            countLiked: countLiked
        });
        // Music.find({})
        //     .then(async (musics) => {
        //         const userId = req.session.userID;
        //         const users = await User.find({ _id: { $ne: req.session.userID} });
        //         const newMusics = await isLiked(userId, musics);
        //         const likedCount = await Likes.countDocuments({ user: userId });
                
        //         res.render('home', {
        //             musics: newMusics,
        //             users: mutipleMongooseToObject(users),
        //             likedMusics: await liked(userId),
        //             count: likedCount
        //         });
        //     })
        //     .catch(next);
    }

    
}

// async function liked(userId) {
//     const likes = await Likes.find({ user: userId })
//     const musicIds = likes.map(like => like.target);
//     const musics = await Music.find({ _id: { $in: musicIds } });
//     return await isLiked(userId, musics);
// }

// async function isLiked(userId, musics) {
//     const likes = await Likes.find({ user: userId });
//     const likedSongIds = likes.map(like => like.target.toString());
//     return musics.map(song => ({
//         ...song._doc,
//         liked: likedSongIds.includes(song._id.toString())
//     }));
// }
async function getAllUsers(req) {
    const users = await User.find({ _id: { $ne: req.session.userID} });
    return users;
}
module.exports = new Homecontroller();