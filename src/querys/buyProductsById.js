import {connection} from '../config/dbConfig.js';

export const buyProductsById = async (id) => {
  try {
    await connection.connect();
    
    const [rows] = await connection.execute(`SELECT * FROM products WHERE id = ?`, [id])

    connection.end()

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
      console.error('Erro na consulta:', error);
      throw error;
  }
  
}