const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// 파일 저장 방식 정의
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 파일 저장 경로
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 원본 파일명 유지
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
}).array("files", 10); // 최대 10개의 파일 업로드 허용

app.use(express.static("public"));
app.use(express.json());

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    const uploadedFiles = req.files.map((file) => ({
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
    }));

    res.json({
      message: "Files uploaded successfully.",
      files: uploadedFiles,
    });
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
