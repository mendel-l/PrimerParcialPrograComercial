'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empleados', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      telefono: {
        type: Sequelize.STRING(15)
      },
      direccion: {
        type: Sequelize.TEXT
      },
      fecha_nacimiento: {
        type: Sequelize.DATE
      },
      fecha_contratacion: {
        type: Sequelize.DATE
      },
      puesto: {
        type: Sequelize.STRING(100)
      },
      salario: {
        type: Sequelize.DECIMAL(10, 2)
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
    await queryInterface.dropTable('Empleados');
  }
};
