const express = require('express');
const path = require('path');

const app = express();
const port = process.env.SERVER_PORT;

if (!port) {
  console.log(
    'Порт не найден.\n' +
    'Убедитесь, что переменная окружения SERVER_PORT задана.\n' +
    'Найти порт можно в блоке "адрес".'
  );
  process.exit(1);
}

const sites = {
  'domain1': 'site1',
  'domain2': 'site2',
};

app.use((req, res, next) => {
  const host = req.hostname;
  const siteFolder = sites[host] || 'default';

  req.sitePath = path.join(__dirname, 'webroot', siteFolder);
  next();
});

app.use((req, res, next) => {
  express.static(req.sitePath)(req, res, next);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(req.sitePath, 'index.html'));
});

app.listen(port, () => {
  console.log(
    `Сервер успешно запустился на порту: ${port}\n` +
    `Что-бы зайти на ваш сайт привяжите домен во вкладке "Домены"`
  );
});
