const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
  console.log('File successfully created! Please, type your text here:')
});

stdin.on('data', data => {
  if (data.toString().trim() == 'exit') {
    console.log('Good bye!');
    process.exit();
  }
  fs.appendFile(filePath, data, (err) => {
    if (err) throw err
  })
});

process.on('SIGINT', () => {
  console.log('Good bye!');
  process.exit();
});

// stdout.write('Как тебя зовут?\n')
// stdin.on('data', data => {
//   const name = data.toString();
//   const reverseName = name.split('').reverse().join('');
//   stdout.write(`\nТвоё имя наоборот ${reverseName}`);
//   process.exit();
// });