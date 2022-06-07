const ProductService = require('../services/productService');

const getAll = async (req, res) => {
  try {
    const products = await ProductService.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAll,
};
