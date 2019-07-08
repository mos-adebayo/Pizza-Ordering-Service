'use strict';
module.exports = (sequelize, DataTypes) => {
  const PizzaType = sequelize.define('PizzaType', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'Name is not valid'
        }
      }
    }
  }, {});
  PizzaType.associate = function(models) {
    // associations can be defined here
  };
  return PizzaType;
};