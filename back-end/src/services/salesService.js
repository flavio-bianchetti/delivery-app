const { Sales, SalesProduct, Product } = require('../database/models');

// SALE_PRODUCTS = [{
//   product: name,
//   quantity: Number,
// }];
// products deverá ser um array de objetos contendo os produtos do pedido e suas quantidades.

const create = async ({
  userId, 
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleProducts }) => {
  const createdSale = await Sales.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente' });

  const { id } = createdSale;

  await Promise.all(saleProducts.map(async (prod) => {
    const { product, quantity } = prod;

    const { id: productId } = await Product.findOne({ where: { name: product } });

    await SalesProduct.create({ saleId: id, productId, quantity });
  }));

  return id;
};

const getAll = async () => Sales.findAll();

const getById = async (id) => Sales.findByPk(id);

const updateStatus = async (id, status) => {
  const changedtatus = await Sales.update({ status }, { where: { id } });
  return changedtatus;
};

module.exports = {
  create,
  getAll,
  getById,
  updateStatus,
};
