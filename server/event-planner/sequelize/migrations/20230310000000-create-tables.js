'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EventDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
    // await queryInterface.createTable('Thread', {
    //   id: {
    //     allowNull: false,
    //     default: Sequelize.fn('uuid_generate_v4'),
    //     primaryKey: true,
    //     type: Sequelize.UUID
    //   },
    //   content: {
    //     type: Sequelize.STRING
    //   },
    //   author: {
    //     type: Sequelize.STRING
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });
    // await queryInterface.createTable('Suggestion', {
    //   id: {
    //     allowNull: false,
    //     default: Sequelize.fn('uuid_generate_v4'),
    //     primaryKey: true,
    //     type: Sequelize.UUID
    //   },
    //   content: {
    //     type: Sequelize.STRING
    //   },
    //   author: {
    //     type: Sequelize.STRING
    //   },
    //   eventId: {
    //     type: Sequelize.UUID
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EventDetails');
    // await queryInterface.dropTable('Threads');
  }
};