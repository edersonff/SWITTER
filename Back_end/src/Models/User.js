const { DataTypes } = require("sequelize");
const conn = require("../Database/conn");

const User = conn.define('User', {
    email: {
        type: DataTypes.STRING(100),
    },
    password: {
        type: DataTypes.STRING(100),
    },
    status: {
        type: DataTypes.TINYINT(),
    }
});

module.exports = User;