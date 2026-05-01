var express = require('express');
var router = express.Router();

const cloudinary = require('../app/models/Cloudinary');
const profileController = require('../app/controllers/ProfileController');

router.patch('/update-avatar',
    (req, res, next) => {
    cloudinary.fields([
        { name: 'image', maxCount: 1 },
    ])(req, res, function (err) {
        if (err) {
            console.error("MULTER ERROR:", err); // 🔥 sẽ ra lỗi thật
            return res.status(500).send(err.message);
        }

        next();
    });
    }, profileController.updateAvatar);
router.patch('/update-header',
    (req, res, next) => {
    cloudinary.fields([
        { name: 'image', maxCount: 1 },
    ])(req, res, function (err) {
        if (err) {
            console.error("MULTER ERROR:", err); // 🔥 sẽ ra lỗi thật
            return res.status(500).send(err.message);
        }

        next();
    });
    }, profileController.updateHeader);   
router.get('/', profileController.profile);

module.exports = router;