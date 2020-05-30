'use strict';

const fs = require(`fs`);
const path = require(`path`);
const multer = require(`multer`);
const nanoid = require(`nanoid`).nanoid;

const {PATH_TO_UPLOADS_DIR} = require(`../../constants/paths`);
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = path.join(PATH_TO_UPLOADS_DIR, file.fieldname);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename(req, file, cb) {
    const fileExtension = file.originalname.split(`.`)[1];
    cb(null, `${nanoid()}.${fileExtension}`);
  }
});
const upload = multer({storage});

if (!fs.existsSync(PATH_TO_UPLOADS_DIR)) {
  fs.mkdirSync(PATH_TO_UPLOADS_DIR);
}

module.exports = {
  upload,
};
