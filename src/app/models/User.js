const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        url: { type: String, default: '' },
        public_id: { type: String, default: '' }
    },
    background: {
        url: { type: String, default: '' },
        public_id: { type: String, default: '' }
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Music' }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);