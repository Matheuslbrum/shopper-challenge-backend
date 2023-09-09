import { updateProductPrice } from "../querys/updateProductPrice.js";

export const updateCSV = async (req, res) => {
  try {
    const file = req.file.buffer.toString('utf8');
    const rows = await parseCSV(file);

    let message;
    for (const row of rows) {
       message = updateProductPrice(row.product_code, row.new_price)
    }
    res.sendStatus(200).json({mensagem: message})
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send('Erro ao salvar informações do arquivo CSV.');
  }
}