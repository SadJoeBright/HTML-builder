const path = require('path');
const fs = require('fs');
const htmlSrcFileName = 'template.html';
const htmlComponentsDirName = 'components';
const outDirName = 'project-dist';
const htmlOutFileName = 'index.html';
const styleSrcDirName  = 'styles';
const stylesOutFIleName = 'style.css';
const assetsSrcDirName = 'assets';
const htmlSrcFilePath = path.join(__dirname, htmlSrcFileName);
const htmlComponentsDirPath = path.join(__dirname, htmlComponentsDirName);
const outDirPath = path.join(__dirname, outDirName);
const htmlOutFilePath = path.join(outDirPath, htmlOutFileName);
const styleSrcDirPath = path.join(__dirname, styleSrcDirName);
const stylesOutFIlePath = path.join(outDirPath, stylesOutFIleName);
const assetsSrcDirPath = path.join(__dirname, assetsSrcDirName);
const assetsOutDirPath = path.join(outDirPath, assetsSrcDirName);


fs.mkdir(outDirPath, {recursive: true}, (err) => {
  if (err) throw err;
});

const readableStream = fs.createReadStream(htmlSrcFilePath, 'utf-8');
let templateData = '';
readableStream.on('data', chunk => templateData += chunk);

readableStream.on('end', () => {
  fs.readdir(path.join(htmlComponentsDirPath), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const readableStream = fs.createReadStream(path.join(htmlComponentsDirPath, file.name), 'utf-8');
      let data = '';
      readableStream.on('data', chunk => data += chunk);
      readableStream.on('end', () => {
        const fileName = path.basename(file.name, path.extname(file.name));
        templateData = templateData.replace(`{{${fileName}}}`, data);
        fs.writeFile(htmlOutFilePath, templateData, (err) => {
          if (err) throw err;
        });
      });
    });
  });
});

let data = '';
fs.writeFile(stylesOutFIlePath, '', (err) => {
  if (err) throw err;
});

fs.readdir(styleSrcDirPath, {withFileTypes: true}, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(path.join(styleSrcDirPath, file.name)) === '.css') {
      const readableStream = fs.createReadStream(path.join(styleSrcDirPath, file.name), 'utf-8');

      readableStream.on('data', chunk => data += chunk);
      readableStream.on('end', () => {
        fs.writeFile(stylesOutFIlePath, data, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});


async function copyFolder(src, out) {
  await fs.promises.mkdir(out, { recursive: true });

  const items = await fs.promises.readdir(src, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(src, item.name);
    const outPath = path.join(out, item.name);

    if (item.isDirectory()) {
      await copyFolder(srcPath, outPath);
    } else {
      await fs.promises.copyFile(srcPath, outPath);
    }
  }
}

copyFolder(assetsSrcDirPath, assetsOutDirPath);

