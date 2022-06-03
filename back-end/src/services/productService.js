const { Product } = require('../database/models');

const getAll = async () => {
  try {
    const products = await Product.findAll();
    console.log(products);
    return products;
  } catch (err) {
    console.log('saiu com erro');
    console.error(err);
    return { error: err.message };
  }
};

module.exports = {
  getAll,
};
