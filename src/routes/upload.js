var express = require('express');
var router = express.Router();

const upload = require('../app/models/Upload');
const uploadController = require('../app/controllers/UploadController');

router.get('/', uploadController.upload);
router.post(
    '/uploaded',
    (req, res, next) => {
    upload.fields([
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