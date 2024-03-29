module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    sellerId: {
      type: DataTypes.INTEGER,
      field: 'seller_id'
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9,2),
      field: 'total_price'
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      field: 'delivery_address'
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      field: 'delivery_number'
    },
    saleDate: {
      type: DataTypes.DATE,
      field: 'sale_date',
      defaultValue: DataTypes.NOW,
    },
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscore: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'fkUserId',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'fkSellerId',
    });

    Sale.belongsToMany(models.Product, {
      through: models.SalesProduct,
    });
  };

  return Sale;
};
