var express = require('express');
var router = express.Router();

const cloudinary = require('../app/models/Cloudinary');
const uploadController = require('../app/controllers/UploadController');

router.get('/', uploadController.upload);
router.post(
    '/uploaded',
    (req, res, next) => {
    cloudinary.fields([
        { name: 'image', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ])(req, res, function (err) {
        if (err) {
            console.error("MULTER ERROR:", err); // 🔥 sẽ ra lỗi thật
            return res.status(500).send(err.message);
        }

        next();
    });
    },
    uploadController.uploaded,
);

module.exports = router;