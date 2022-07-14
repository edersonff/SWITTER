const { DataTypes } = require("sequelize");
const conn = require("../Database/conn");

const Client = conn.define('Client', {
    name: {
        type: DataTypes.STRING(100),
    },
    balance: {
        type: DataTypes.INTEGER()
    }
})


module.exports = Client;