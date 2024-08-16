'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Empleado extends Model {
    static associate(models) {
      // Asociación con la tabla `asignaciones`
      Empleado.hasMany(models.Asignacion, { foreignKey: 'empleado_id' });
    }
  };
  Empleado.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_contratacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    puesto: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    salario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Empleado',
    tableName: 'empleados',
    timestamps: false
  });
  return Empleado;
};
