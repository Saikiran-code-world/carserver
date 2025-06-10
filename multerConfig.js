const multer = require("multer");
const path = require("path");

// Set the storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Path where the files will be stored (make sure this folder exists)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename based on the current timestamp
  },
});

const fileFilter = (req, file, cb) => {
  // Only accept image files
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
