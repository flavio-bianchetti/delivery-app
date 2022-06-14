const { Sale, SalesProduct, Product } = require('../database/models');

const create = async ({
  userId, 
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleProducts }) => {
  const createdSale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente' });

  const { id } = createdSale;

  await Promise.all(saleProducts.map(async (prod) => {
    const { product, quantity } = prod;

    const { id: productId } = await Product.findOne({ where: { name: product } });

    await SalesProduct.create({ saleId: id, productId, quantity });
  }));

  return id;
};

const getAll = async () => Sale.findAll();

// const getById = async (id) => Sales.findByPk(id);

// solução adaptada de:
// https://stackoverflow.com/questions/22958683/how-to-implement-many-to-many-association-in-sequelize
// https://stackoverflow.com/questions/38857156/how-to-query-many-to-many-relationship-sequelize
const getById = async (id) => {
  const saleProduct = await Sale.findOne(
    {
      where: { id },
      include: [
        {
          model: Product,
          as: 'Products',
          attributes: ['name', 'price'],
          through: { attributes: ['quantity'] },
        },
      ],
  },
);
  return saleProduct;
};

const getByUserId = async (id) => Sale.findAll({ where: { userId: id } });

const updateStatus = async (id, status) => {
  const changedtatus = await Sale.update({ status }, { where: { id } });
  return changedtatus;
};

module.exports = {
  create,
  getAll,
  getById,
  updateStatus,
  getByUserId,
};
