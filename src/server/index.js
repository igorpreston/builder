const { resolve } = require('path');
const express = require('express');
const app = express();

const distPath = resolve(__dirname, '../../', 'dist');

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use('/', express.static(distPath));

app.get('/', function (req, res) {
  res.send(resolve(distPath, 'index.html'));
});

app.listen(3000);