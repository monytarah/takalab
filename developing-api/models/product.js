'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};