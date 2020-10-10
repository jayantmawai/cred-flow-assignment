const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Customer = sequelize.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  gst_number: {
    type: Sequelize.STRING,
    allowNull: true
  },
  frequency: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Customer;
