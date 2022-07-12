const { DataTypes } = require("sequelize");
const conn = require("../Database/conn");

const Client = conn.define('Transfer', {
    amount: {
        type: DataTypes.INTEGER(),
    },
    transfer_key: {
        type: DataTypes.STRING(),
    }
})


module.exports = Client;