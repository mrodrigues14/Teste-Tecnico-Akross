const express = require('express');
const initializeDatabase = require('./database');
const path = require('path');
const router = require('../routers/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDatabase();

app.use('/', router);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Acesse a aplicação em http://localhost:${PORT}`);
});
