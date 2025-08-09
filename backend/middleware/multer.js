const multer = require('multer');
const path = require('path');

// multer file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
// multer file checking
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const extName = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png"].includes(extName)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, or .png formats allowed!"));
    }
  }
});

module.exports = upload;