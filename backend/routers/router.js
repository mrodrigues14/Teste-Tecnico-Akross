const express = require('express');
const router = express.Router();
const db = require('../base/database');

router.get('/squads', (req, res) => {
  db.connection.query('SELECT * FROM squads', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao consultar o banco de dados');
    } else {
      res.json(results);
    }
  });
});

router.post('/squads', (req, res) => {
  const { name } = req.body;
  db.connection.query('INSERT INTO squads (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao inserir no banco de dados');
    } else {
      res.status(201).send('Squad adicionado com sucesso');
    }
  });
});

router.get('/colaboradores', (req, res) => {
  db.connection.query('SELECT * FROM colaboradores', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao consultar o banco de dados');
    } else {
      res.json(results);
    }
  });
});

router.post('/colaboradores', (req, res) => {
  const { name, squad_id } = req.body;
  db.connection.query('INSERT INTO colaboradores (name, squad_id) VALUES (?, ?)', [name, squad_id], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao inserir no banco de dados');
    } else {
      res.status(201).send('Colaborador adicionado com sucesso');
    }
  });
});

module.exports = router;
