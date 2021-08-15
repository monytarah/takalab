'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product)
    }
  };
  Cart.init({
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.paid = false
      }
    }
  });
  return Cart;
};