const SalesService = require('../services/salesService');

const getAll = async (_req, res, _next) => {
  const sales = await SalesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const oneSale = await SalesService.getById(id);
  return res.status(200).json(oneSale);
};

const getByUserId = async (req, res, _next) => {
  const { id } = req.params;
  const userSale = await SalesService.getByUserId(id);
  return res.status(200).json(userSale);
};

const getBySellerId = async (req, res, _next) => {
  const { id } = req.body;
  const sellerSales = await SalesService.getBySellerId(id);

  if (!sellerSales.length) {
    return res.status(404).json({ message: 'This seller has no sales' }); 
  }

  return res.status(200).json(sellerSales);
};

const updateStatus = async (req, res, _next) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await SalesService.updateStatus(id, status);
  return res.status(200).json(updated);
};

const create = async (req, res, _next) => {
  const {
    userId, 
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleProducts,
  } = req.body;

  const createdSaleId = await SalesService.create({
    userId, 
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleProducts,
  });

  return res.status(201).json({ id: createdSaleId });
};

module.exports = {
  getAll,
  getById,
  updateStatus,
  create,
  getByUserId,
  getBySellerId,
};