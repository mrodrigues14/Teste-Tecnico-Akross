const express = require('express');
const db = require('../base/database');
const path = require('path');
const router = require('../routers/router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

db.connectToDatabase();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.use(express.static(path.join(__dirname, '../../frontend')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Acesse a aplicação em http://localhost:${PORT}`);
});
``
