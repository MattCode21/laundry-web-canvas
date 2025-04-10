
const { sequelize } = require('../config/database');
const User = require('./user.model');
const Order = require('./order.model');
const OrderItem = require('./orderItem.model');
const Price = require('./price.model');

// Define model associations
User.hasMany(Order, {
  foreignKey: 'userId',
  as: 'orders'
});

Order.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items'
});

OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});

OrderItem.belongsTo(Price, {
  foreignKey: 'priceId',
  as: 'priceDetails'
});

Price.hasMany(OrderItem, {
  foreignKey: 'priceId',
  as: 'orderItems'
});

module.exports = {
  sequelize,
  User,
  Order,
  OrderItem,
  Price
};
