const Users = require('./user');

const Sales = (sequelize, DataTypes) => 
  sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscore: true,
  });

  Sales.belongsTo(Users, { foreignKey: 'userId', as: 'fkUserId' });
  Sales.belongsTo(Users, { foreignKey: 'sellerId', as: 'fkSellerId' });
  
  Users.hasMany(Sales, { foreignKey: 'idUser', as: 'fkIdUser' });
  Users.hasMany(Sales, { foreignKey: 'idSeller', as: 'fkIDSeller' });

module.exports = Sales;
