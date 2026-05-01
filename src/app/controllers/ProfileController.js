const Music = require('../models/Music');
const Likes = require('../models/Likes');
const User = require('../models/User');

const cloudinary = require('../../config/cloudinary');
const { isLiked ,liked } = require('../../services/likeService');
const { mongooseToObject } = require('../../util/mongoose');


class Profilecontroller {
   async profile(req, res, next) {
        const userId = req.session.userID;
        const user = await User.findOne({ _id: userId });
        const likedCount = await Likes.countDocuments({ user: userId });
        res.render('profile', {
            // user: mongooseToObject(user),
            likedMusics: await liked(userId),
            count: likedCount,
        });
   }

   async updateAvatar(req, res, next) {
        const user = await User.findById(req.session.userID);
        if (user.avatar?.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        user.avatar = {
            url: req.files?.image?.[0]?.path,
            public_id: req.files?.image?.[0]?.filename
        };
        console.log(user);
        user.save()
            .then(() => res.redirect('/profile'))
            .catch(next);
        
    }

    async updateHeader(req, res, next) {
        const user = await User.findById(req.session.userID);
        if (user.background?.public_id) {
            await cloudinary.uploader.destroy(user.background.public_id);
        }
        user.background = {
            url: req.files?.image?.[0]?.path,
            public_id: req.files?.image?.[0]?.filename
        };
        
        user.save()
            .then(() => res.redirect('/profile'))
            .catch(next);
        console.log(user);
    }
}

module.exports = new Profilecontroller();