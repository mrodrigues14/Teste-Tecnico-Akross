const mysql = require('mysql');
const faker = require('faker');

const initializeDatabase = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'nome_do_banco'
  });

  connection.connect();

  const createTables = `
  CREATE TABLE IF NOT EXISTS squads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS colaboradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    squad_id INT,
    FOREIGN KEY (squad_id) REFERENCES squads(id)
  );
  `;

  connection.query(createTables, (err) => {
    if (err) throw err;
    console.log("Tabelas criadas com sucesso!");

    for (let i = 0; i < 5; i++) {
      const squadName = `Squad ${faker.lorem.word()}`;
      connection.query('INSERT INTO squads (name) VALUES (?)', [squadName], (err, results) => {
        if (err) throw err;

        const squadId = results.insertId;
        for (let j = 0; j < 10; j++) {
          const colaboradorName = faker.name.findName();
          connection.query('INSERT INTO colaboradores (name, squad_id) VALUES (?, ?)', [colaboradorName, squadId], (err) => {
            if (err) throw err;
          });
        }
      });
    }

    console.log("Dados inseridos com sucesso!");
  });

  connection.end();
};

module.exports = initializeDatabase;
