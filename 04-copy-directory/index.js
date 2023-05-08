const fs = require('fs');
const path = require('path');

async function checkAndDeleteFilesCopyDir() {
  try {
    await fs.promises.rm(path.join(__dirname, 'files-copy'), { recursive: true });
  } catch  {
    return;
  }
}

async function copyFiles() {
  try {
    await checkAndDeleteFilesCopyDir();
    await fs.promises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
    const files = await fs.promises.readdir(path.join(__dirname, 'files'), { withFileTypes: true });
    for (const file of files) {
      await fs.promises.copyFile(
        path.join(__dirname, 'files', file.name),
        path.join(__dirname, 'files-copy', file.name),
      );
    }
  } catch (err) {
    console.log(err);
  }
}

copyFiles();
