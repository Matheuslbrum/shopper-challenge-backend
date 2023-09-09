import { buyProductsById } from "../querys/buyProductsById.js";

export const validateCSVFile = (data) => {
const validatedData = [];


for (const row of data) {
  const errors = [];
  const product = buyProductsById(row.product_code)

  if (!row.product_code) {
    errors.push('Campo "product_code" não existe');
  }
  if (!/^\d+$/.test(row.product_code)) {
    errors.push('Campo "product_code" não é um valor numérico válido');
  }

  if (!row.new_price) {
    errors.push('Campo "new_price" não existe');
  }

  if(!/^\d+(\.\d+)?$/.test(row.new_price)) {
    errors.push('Campo "new_price" não é um número decimal válido');
  }

  if(!product) {
    errors.push('Não existe produto com esse código');
  } else {
    if (row.newPrice < product.cost_price) {
      errors.push('O novo preço não pode ser menor que o preço de custo');
    }
    if (row.newPrice > product.sales_price + product.sales_price*0.1 || row.newPrice > product.sales_price - product.sales_price*0.1) {
      errors.push('O reajuste deve ser dentro de 10% do preço atual.');
    }
  }

  if (errors.length === 0) {
    validatedData.push({
      code: row.product_code,
      name: product.name,
      currentPrice: product.current_price,
      newPrice: parseFloat(row.new_price),
      errors: '',
    });
  } else {
    validatedData.push({
      code: row.product_code,
      name: product.name || '',
      currentPrice: product.current_price || '',
      newPrice: row.new_price,
      errors: errors.join(', '),
    });
  }
}

return validatedData;
}