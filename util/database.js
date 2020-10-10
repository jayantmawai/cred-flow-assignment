const Sequelize = require('sequelize');

const sequelize = new Sequelize('cred_flow_crm', 'postgres', 'my_psql', {
  dialect: 'postgres',
  host: 'localhost',
  storage: "./session.postgres",
});

module.exports = sequelize;
