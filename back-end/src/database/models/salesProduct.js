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
    tableName: 'salesProducts',
    underscored: true,
  });

    Products.belongsToMany(Sales, {
      as: 'sales',
      through: ProductSales,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
    Sales.belongsToMany(Products, {
      as: 'products',
      through: ProductSales,
      foreignKey: 'saleId',
      otherKey: 'productId',
    }); 

module.exports = SalesProducts;
