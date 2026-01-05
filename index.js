const fs = require('fs');
const yaml = require('js-yaml');
const express = require('express');
const path = require('path');

const app = express();

let config;
try {
  config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
} catch (e) {
  console.error('Ошибка чтения config.yml:', e);
  process.exit(1);
}

const port = config?.server?.port;

if (!port) {
  console.log(`Порт не найден, замените его вручную в config.yml\nНайти порт можно в блоке "адрес"`);
  process.exit(1);
}

const webrootPath = path.join(__dirname, 'webroot');

app.use(express.static(webrootPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(webrootPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Сервер успешно запустился на порту: ${port}\nЧто-бы зайти на ваш сайт привяжите домен во вкладке "Домены"`);
});