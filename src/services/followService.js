const User = require('../app/models/User');

module.exports = {
    following:async function (userCurrent, userTarget) {
        const filter = { _id: userCurrent, following: { $ne: userTarget}};
        const update = {
            $addToSet: { following: userTarget },
            $inc: { followingCount: 1 }
        };
        
        return await User.updateOne(filter, update);
    },

    followers: async function (userCurrent, userTarget) {
        const filter = { _id: userTarget, followers: { $ne: userCurrent}};
        const update = {
            $addToSet: { followers: userCurrent },
            $inc: { followersCount: 1 }
        };
        
        await User.updateOne(filter, update);
    },

    unFollowing: async function (userCurrent, userTarget) {
        const filter = { _id: userCurrent, following: userTarget};
        const update = {
            $pull: { following: userTarget },
            $inc: { followingCount: -1 }
        };
        
        return await User.updateOne(filter, update);
    },

    unFollowers: async function (userCurrent, userTarget) {
        const filter = { _id: userTarget, followers: userCurrent};
        const update = {
            $pull: { followers: userCurrent },
            $inc: { followersCount: -1 }
        };
        
        await User.updateOne(filter, update);
    },
}