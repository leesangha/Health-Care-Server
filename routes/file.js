const { predictImg } = require("../darkflow_2/img-prediction/predictImg");
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const moment = require("moment");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    const uploadsPath = path.resolve("server", "uploads");

    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }

    const id = req.body.id;
    const userDir = path.resolve("server", "uploads", id);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
    }

    const today = moment().format("YYMMDD");
    const fileDir = path.join(userDir, today);

    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir);
    }

    callback(null, fileDir);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);

    const now = moment().format("YYMMDD-hh:mm:ss");
    callback(null, basename + "-" + now + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

router.post("/uploads", upload.single("img"), async (req, res) => {
  console.log('uploads 라우터 함수 호출됨.');

  const userNumber = Number(req.body.id);
  const today = moment().format("YYMMDD");

  const result = await predictImg(userNumber, today, req.file.filename);
  res.send(result);
});

router.post("/history", (req, res) => {
  const userNumber = req.body.userNumber;

  const uploadsPath = path.resolve("server", "uploads");

  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
  }
  const userPath = path.resolve(uploadsPath, userNumber.toString());

  let dirs;
  try {
    fs.readdirSync(userPath);
  } catch (e) {
    fs.mkdirSync(userPath);
  } finally {
    dirs = fs.readdirSync(userPath);
  }
  const fileDirs = dirs.map((dir) => path.join(userPath, dir));

  const imgFiles = fileDirs.map((dir) => {
    const fileNameList = fs.readdirSync(dir);
    const list = dir.split(path.sep);
    const last = list.length - 1;
    const dirName = path.join(list[last - 2], list[last - 1], list[last]);
    const _path = "http://localhost:4002/" + dirName;

    return {
      date: list[last],
      imgSrc: fileNameList.map((filename) => _path + "/" + filename),
    };
  });

  res.send(imgFiles);
});

module.exports = router;
