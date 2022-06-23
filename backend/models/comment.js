const { DataTypes } = require('sequelize');
const { bdd } = require('./index');

module.exports = bdd.define("comment", {

    content: {
        type: DataTypes.STRING
    },

}, {

    bdd,
    tableName: 'Comment',
    //timestamps: false
});