const path = require('path');
const fs = require('fs');
const outDirName = 'project-dist';
const fileName = 'bundle.css';
const srcDirName = 'styles';
const filePath = path.join(__dirname, outDirName, fileName);
const srcDirPath = path.join(__dirname, srcDirName);
let data = '';

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
});

fs.readdir(srcDirPath, {withFileTypes: true}, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(path.join(srcDirPath, file.name)) === '.css') {
      const readableStream = fs.createReadStream(path.join(srcDirPath, file.name), 'utf-8');

      readableStream.on('data', chunk => data += chunk);
      readableStream.on('end', () => {
        fs.writeFile(filePath, data, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});