const { stdin } = process;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
  console.log('File successfully created! Please, type your text here:');
});

stdin.on('data', data => {
  if (data.toString().trim() == 'exit') {
    console.log('Good bye!');
    process.exit();
  }
  fs.appendFile(filePath, data, (err) => {
    if (err) throw err;
  });
});

process.on('SIGINT', () => {
  console.log('Good bye!');
  process.exit();
});

