'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Asignaciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Empleados',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      proyecto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Proyectos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      fecha_asignacion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_liberacion: {
        type: Sequelize.DATE
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

    await queryInterface.addConstraint('Asignaciones', {
      fields: ['empleado_id', 'proyecto_id', 'fecha_liberacion'],
      type: 'unique',
      name: 'unique_empleado_proyecto'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Asignaciones');
  }
};
