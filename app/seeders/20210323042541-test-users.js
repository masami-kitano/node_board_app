'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users', [
      { name: 'testuser1',  email: 'testuser1@example.com', password: 'testuser1', createdAt: now, updatedAt: now},
      { name: 'testuser2',  email: 'testuser2@example.com', password: 'testuser2', createdAt: now, updatedAt: now},
      { name: 'testuser3',  email: 'testuser3@example.com', password: 'testuser3', createdAt: now, updatedAt: now},
      { name: 'testuser4',  email: 'testuser4@example.com', password: 'testuser4', createdAt: now, updatedAt: now},
      { name: 'testuser5',  email: 'testuser5@example.com', password: 'testuser5', createdAt: now, updatedAt: now},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};