const { DataTypes, Models, Sequelize } = require('sequelize');
const { bdd } = require('./index');

module.exports = bdd.define("comment", {

    comment: {
        type: DataTypes.TEXT
    }

}, {

    bdd,
    tableName: 'Post',
    //timestamps: false
});