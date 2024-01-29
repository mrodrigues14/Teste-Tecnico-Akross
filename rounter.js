const express = require('express');
const router = express.Router();
const db = require('./database'); // Importa a configuração do banco de dados

// Rota para listar todos os squads
router.get('/squads', (req, res) => {
  db.query('SELECT * FROM squads', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao consultar o banco de dados');
    } else {
      res.json(results);
    }
  });
});

// Rota para adicionar um novo squad
router.post('/squads', (req, res) => {
  // Adicione aqui a lógica para inserir um novo squad no banco
});

// Adicione mais rotas conforme necessário

module.exports = router;
