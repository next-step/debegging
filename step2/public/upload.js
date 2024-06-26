const CHUNK_SIZE = 1024 * 1024; // 1MB

export async function uploadFile(file) {
  let start = 0;

  await fetch("/reset");

  while (start < file.size) {
    const chunk = file.slice(start, start + CHUNK_SIZE);
    const formData = new FormData();

    formData.append("file", chunk);

    await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    start += CHUNK_SIZE;
    await updateProgress(start, file.size);
  }
}

async function updateProgress(uploadedBytes, totalSize) {
  const progress = (uploadedBytes / totalSize) * 100;
  updateProgressBar(progress);
}

function updateProgressBar(progress) {
  const progressBarFill = document.querySelector(".progress-bar-fill");
  const progressText = document.querySelector(".progress-text");

  progressBarFill.style.width = `${progress}%`;
  progressText.textContent = `${Math.round(progress)}%`;
}
