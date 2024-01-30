const express = require('express');
const initializeDatabase = require('./database');
const path = require('path');

const app = express();
app.use(express.json());

initializeDatabase();


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'index.html'));
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Acesse a aplicação em http://localhost:${PORT}`);
});
