import fs from 'fs'
import csv from 'csv-parser';

export const parseCSV = (csvData) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(csvData)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}