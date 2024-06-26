const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.use(express.static("public"));
app.use(express.json());

let uploadedBytes = 0;

// /upload: 파일 업로드를 처리하는 엔드포인트입니다.
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.json({
    message: "File uploaded successfully.",
    fileSize: req.file.size,
  });
});

// /progress: 현재까지 업로드된 파일 크기를 반환하는 엔드포인트입니다.
app.post("/progress", (req, res) => {
  const { chunkSize } = req.body;
  uploadedBytes += parseInt(chunkSize, 10);
  res.json({ uploadedBytes });
});

// /reset: 업로드된 파일 크기를 초기화하는 엔드포인트입니다.
app.get("/reset", (req, res) => {
  uploadedBytes = 0;
  res.send("Upload progress reset");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
