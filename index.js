const express = require('express');
const path = require('path');
const app = express();
const port = PORT_PLACEHOLDER;

if (!port) {
  return console.log(`Порт не найден, замените его вручную в server.js\nНайти порт можно в блоке "адрес"`);
}

const webrootPath = path.join(__dirname, 'webroot');

app.use(express.static(webrootPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(webrootPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Сервер успешно запустился на порту: ${port}\nЧто-бы зайти на ваш сайт привяжите домен во вкладке "Домены"`);
});