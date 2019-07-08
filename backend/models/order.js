'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Customer name is not valid'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Quantity is not valid'
        }
      },
      defaultValue: 1
    },
    pizzaTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Pizza type is not valid'
        }
      }
    },
    pizzaSizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Pizza size is not valid'
        }
      }
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Status is not valid'
        }
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Address is not valid'
        }
      },
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    paranoid: true
  });
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Status, {
      through: 'statusId',
      as: 'status'
    });
    Order.belongsTo(models.PizzaType, {
      through: 'pizzaTypeId',
      as: 'pizzaType'
    });
    Order.belongsTo(models.PizzaSize, {
      through: 'pizzaSizeId',
      as: 'pizzaSize'
    });
  };
  return Order;
};