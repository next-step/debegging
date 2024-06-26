import { uploadFile } from "./upload.js";

const uploadButton = document.getElementById("uploadButton");
const fileInput = document.getElementById("fileInput");

uploadButton.addEventListener("click", () => {
  const file = fileInput.files[0];

  if (file) {
    uploadFile(file);
    return;
  }

  alert("Please select a file");
});
