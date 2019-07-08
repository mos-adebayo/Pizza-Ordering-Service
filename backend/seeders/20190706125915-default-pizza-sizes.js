'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now_ = new Date();
    return queryInterface.bulkInsert('PizzaSizes', [
      { name: 'Small',  createdAt: now_, updatedAt: now_ },
      { name: 'Medium',  createdAt: now_, updatedAt: now_ },
      { name: 'Large',  createdAt: now_, updatedAt: now_ },
      { name: 'X-Large',  createdAt: now_, updatedAt: now_ },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PizzaSizes', null, {});
  }
};
