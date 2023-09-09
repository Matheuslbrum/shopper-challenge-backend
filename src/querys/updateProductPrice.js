import {connection} from '../config/dbConfig.js';

export const updateProductPrice = async (id, newData) => {
  try {
    await connection.connect();
    
    const [results] = await connection.execute(`UPDATE products SET sales_price = ? WHERE id = ?`, [newData, id])

    connection.end()
    
    if (results.affectedRows  > 0) {
      return `Registro com id ${id} atualizado com sucesso`;
    } else {
      return `Nenhum registro encontrado com ID ${id} para atualização.`;
    }
  } catch (error) {
      console.error('Erro na consulta:', error);
      throw error;
  }
}