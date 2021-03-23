const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const uuid = v4;
const storage = multer.diskStorage({
    //destination: path.join(__dirname, '../public/static/images'),
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, uuid() +  path.extname(file.originalname).toLocaleLowerCase())
    }
});

const upload = multer({
    storage,
    //fieldSize:2000000,
    fileFilter: (req, file, cb) => {
        const typesFile = /jpeg|png|jpg|gif/
        const extname = typesFile.test(file.mimetype)
        const names = typesFile.test(path.extname(file.originalname).toLocaleLowerCase());
        if (names && extname) {
            return cb(null, true)
        } else {
            return false;            
        }
    }
})
.single('image');


module.exports = upload