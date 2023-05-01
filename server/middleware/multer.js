const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substr(file.originalname.lastIndexOf("."));
    
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage})

module.exports = {upload}