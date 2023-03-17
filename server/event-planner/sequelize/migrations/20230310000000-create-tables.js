'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('Threads', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      content: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      eventId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
    await queryInterface.dropTable('Threads');
  }
};