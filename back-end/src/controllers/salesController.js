const SalesService = require('../services/salesService');

const getAll = async (_req, res, _next) => {
  const sales = await SalesService.getAll();
  return res.status(200).json({ response: sales });
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const oneSale = await SalesService.getById(id);
  return res.status(200).json({ response: oneSale });
};

const updateStatus = async (req, res, _next) => {
  const { id } = req.params;
  const { status } = req.body;
  await SalesService.updateStatus(id, status);
  return res.status(200).json({ response: 'Atualizado com sucesso!' });
};

module.exports = {
  getAll,
  getById,
  updateStatus,
};