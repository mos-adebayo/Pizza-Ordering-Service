'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now_ = new Date();
    return queryInterface.bulkInsert('Statuses', [
      { name: 'Pending',  createdAt: now_, updatedAt: now_ },
      { name: 'Delivered',  createdAt: now_, updatedAt: now_ },
      { name: 'Canceled',  createdAt: now_, updatedAt: now_ },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Statuses', null, {});

  }
};
