const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname,'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) throw err;
        console.log(file.name.replace('.', ' - '), '-', `${stats.size.toString()}` + 'bytes');
      })
    }
  })
});