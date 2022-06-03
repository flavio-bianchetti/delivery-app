const { Product } = require('../database/models');

const getAll = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

module.exports = {
  getAll,
};
