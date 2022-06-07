const { Sales, SalesProducts, Products } = require('../database/models');

// PRODUCTS = [{
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
  products }) => {
  const createdSale = await Sales.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente' });

  const [saleId] = createdSale;

  await Promise.all(products.forEach(async (prod) => {
    const [product, quantity] = prod;

    const productId = await Products.findOne({ where: { name: product } });
    await SalesProducts.create({ saleId, productId, quantity });
  }));

  return saleId;
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
