module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Product);
    SalesProduct.belongsTo(models.Sale);
  };

  return SalesProduct;
};
