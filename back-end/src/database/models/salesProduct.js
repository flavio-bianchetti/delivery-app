const Sales = require('./sale');
const Products = require('./product');

const SalesProducts = (sequelize, DataTypes) => 
  sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SalesProducts.associate = (models) => {
    SalesProducts.belongsToMany(models.Sales, {
      foreignKey: 'saleId',
      as: 'fkSaleId'
    });
    SalesProducts.belongsToMany(models.Products, {
      foreignKey: 'productId',
      as: 'fkProductId'
    });
  };

module.exports = SalesProducts;
