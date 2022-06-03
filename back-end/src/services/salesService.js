const { Sales } = require('../database/models');

const getAll = async () => Sales.findAll();

const getById = async (id) => Sales.findByPk(id);

const updateStatus = async (id, status) => {
  const changedtatus = await Sales.update({ status }, { where: { id } });
  return changedtatus;
};

module.exports = {
  getAll,
  getById,
  updateStatus,
};
