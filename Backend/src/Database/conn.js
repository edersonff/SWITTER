const { Sequelize } = require("sequelize");
const env = require('dotenv').config().parsed;

module.exports = new Sequelize(env.MYSQL_SCHEMA, env.MYSQL_USER, env.MYSQL_PASS, {
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: 'mysql'
});