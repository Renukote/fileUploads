const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../uploads"))
    },
    filename: function (req, file, callback) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, uniquePrefix + '-' + file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){ callback(null, true) }
    else{ callback(null, false) }
}

const upload = multer({
    storage,
    fileFilter,
    limit: {
        fileSize: 1024 * 1024 * 5 //5MB
    }
})

module.exports = upload;