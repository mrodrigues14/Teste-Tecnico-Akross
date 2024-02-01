const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'desafioAkross'
});

const initializeTables = () => {
  const createSquadsTable = `
    CREATE TABLE IF NOT EXISTS squads (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const createColaboradoresTable = `
    CREATE TABLE IF NOT EXISTS colaboradores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      squad_id INT,
      FOREIGN KEY (squad_id) REFERENCES squads(id)
    );
  `;

  connection.query(createSquadsTable, (err) => {
    if (err) throw err;
    console.log("Tabela 'squads' criada com sucesso!");

    connection.query(createColaboradoresTable, (err) => {
      if (err) throw err;
      console.log("Tabela 'colaboradores' criada com sucesso!");
    });
  });
};

const connectToDatabase = () => {
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    initializeTables();
  });
};

module.exports = {
  connectToDatabase,
  connection
};
