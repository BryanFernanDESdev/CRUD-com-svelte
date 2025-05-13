'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tarefa extends Model {
    static associate(models) {
      // Definir associações, se necessário
    }
  }
  Tarefa.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    status: DataTypes.STRING,
    data_criacao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tarefa',
    timestamps: true // Adiciona os campos createdAt e updatedAt automaticamente
  });
  return Tarefa;
};
