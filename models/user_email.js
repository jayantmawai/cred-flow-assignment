const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserEmail = sequelize.define('user_email', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email_content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email_subject: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = UserEmail;