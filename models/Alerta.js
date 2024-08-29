'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Alerta extends Model {
    static associate(models) {
      // Definir la asociación con el modelo `Proyecto`
      Alerta.belongsTo(models.Proyecto, { foreignKey: 'proyecto_id', as: 'Proyecto' });
    }
  }
  
  Alerta.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proyectos',
        key: 'id'
      }
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false
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
    modelName: 'Alerta',
    tableName: 'alertas',
    timestamps: false
  });
  
  return Alerta;
};
