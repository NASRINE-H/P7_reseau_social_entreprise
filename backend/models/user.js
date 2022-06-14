const { DataTypes, Models, Sequelize } = require('sequelize');
const { bdd } = require('./index');

module.exports = bdd.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    bdd,
    tableName: 'users',
    //timestamps: false


});