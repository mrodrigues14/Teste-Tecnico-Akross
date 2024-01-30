const mysql = require('mysql2');
const faker = require('faker');

//database criada localmente utilizando mysql
//para simular necessário ter o mysql server instalado no computador e alterar abaixo os nomes.
//as tabaleas vão ser criadas casa não existam e vão ser populadas com dados ficticios para testes.


const initializeDatabase = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'desafioAkross'
  });

  connection.connect();
  //cria as tabelas necessárias para o projeto na database
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
    if (err) {
      connection.end();
      throw err;
    }
    console.log("Tabela 'squads' criada com sucesso!");

    connection.query(createColaboradoresTable, (err) => {
      if (err) {
        connection.end();
        throw err;
      }
      console.log("Tabela 'colaboradores' criada com sucesso!");



      //popular tabelas com dados ficticios.
      let squadsCreated = 0;
      for (let i = 0; i < 5; i++) {
        const squadName = `Squad ${faker.lorem.word()}`;
        connection.query('INSERT INTO squads (name) VALUES (?)', [squadName], (err, results) => {
          if (err) {
            connection.end();
            throw err;
          }

          const squadId = results.insertId;
          let colaboradoresCreated = 0;
          for (let j = 0; j < 10; j++) {
            const colaboradorName = faker.name.findName();
            connection.query('INSERT INTO colaboradores (name, squad_id) VALUES (?, ?)', [colaboradorName, squadId], (err) => {
              if (err) {
                connection.end();
                throw err;
              }
              colaboradoresCreated++;
              if (colaboradoresCreated === 10 && squadsCreated === 4) {
                console.log("Dados inseridos com sucesso!");
                connection.end();
              }
            });
          }
          squadsCreated++;
        });
      }
    });
  });
};

module.exports = initializeDatabase;
