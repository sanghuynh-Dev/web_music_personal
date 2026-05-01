const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    target: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    targetType: {
        type: String,
        enum: ['music', 'playlist'],
        required: true,
    }

}, {
    timestamps: true,
});

likeSchema.index(
  { user: 1, target: 1, targetType: 1 },
  { unique: true }
);

module.exports = mongoose.model('Likes', likeSchema);