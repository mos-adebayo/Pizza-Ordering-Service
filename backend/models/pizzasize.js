'use strict';
module.exports = (sequelize, DataTypes) => {
  const PizzaSize = sequelize.define('PizzaSize', {
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
  PizzaSize.associate = function(models) {
    // associations can be defined here
  };
  return PizzaSize;
};