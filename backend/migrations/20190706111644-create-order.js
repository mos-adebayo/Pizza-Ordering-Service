'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: 'Customer name is not valid'
          }
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      pizzaTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PizzaTypes',
          key: 'id'
        },
        allowNull: false,
      },
      pizzaSizeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PizzaSizes',
          key: 'id'
        },
        allowNull: false,
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id'
        },
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          isNull: {
            msg: 'Address is not valid'
          }
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};