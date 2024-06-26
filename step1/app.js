const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

let uploadedBytes = 0;

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.json({
    message: "File uploaded successfully.",
    fileSize: req.file.size,
  });
});

app.post("/progress", (req, res) => {
  const { chunkSize } = req.body;
  uploadedBytes += parseInt(chunkSize, 10);
  res.json({ uploadedBytes });
});

app.get("/reset", (req, res) => {
  uploadedBytes = 0;
  res.send("Upload progress reset");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
