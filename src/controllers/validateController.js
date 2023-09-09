import { parseCSV } from "../services/csvToJson.js";
import { validateCSVFile } from "../services/validarCSV.js";

export const validateCSV = async (req, res) => {
  try {
    const file = req.file.buffer.toString('utf8');
    console.log('foi')
    const rows = await parseCSV(file);
    const validatedData = validateCSVFile(rows);

    res.sendStatus(200).json(validatedData);
  } catch (error) {
    res.sendStatus(500).send('Erro ao processar o arquivo CSV.');
  }
}