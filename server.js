const express = require('express');
const initializeDatabase = require('./init_db'); // Importa o módulo

const app = express();
app.use(express.json());

// Inicializa o banco de dados
initializeDatabase();

// Configuração do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
