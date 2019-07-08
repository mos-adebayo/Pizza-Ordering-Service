'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now_ = new Date();
    return queryInterface.bulkInsert('PizzaTypes', [
      { name: 'Margarita',  createdAt: now_, updatedAt: now_ },
      { name: 'Marinara',  createdAt: now_, updatedAt: now_ },
      { name: 'Salami',  createdAt: now_, updatedAt: now_ },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PizzaTypes', null, {});
  }
};
