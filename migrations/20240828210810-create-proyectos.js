'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Proyectos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      porcentaje_completado: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0.00
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Proyectos');
  }
};
