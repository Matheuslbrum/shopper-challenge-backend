import {connection} from '../config/dbConfig.js';

export const createAndSeedTablePacks = () => {

  const rowsToInsert = [
    [1000,18,6],
    [1010, 24, 1],
    [1010, 26, 1],
    [1020, 19, 3],
    [1020, 21, 3],
  ];

  connection.query(`
  CREATE TABLE IF NOT EXISTS packs 
  (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    pack_id bigint NOT NULL,
    product_id bigint NOT NULL,
    qty bigint NOT NULL,
    CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
    CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code)
  )
  `, (err) => {
    if (err) throw err;
  
    connection.query(`
    INSERT INTO packs (pack_id,product_id, qty) VALUES ?;

    `, [rowsToInsert], (err) => {
      if (err) throw err;
      console.log('Tabelas criadas e dados semeados com sucesso.');
      process.exit();
    });
  });
}
  