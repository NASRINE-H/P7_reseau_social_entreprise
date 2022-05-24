const { DataTypes, Models, Sequelize } = require('sequelize');
const { bdd } = require('./index');

module.exports = bdd.define("post", {

        /*id: {
            type: DataTypes.INTEGER.UNSIGNED, //unsigned ça veut dire il sera toujours positif
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },*/

        titre: {
            type: DataTypes.STRING,
            allowNull: false

        },

        content: {
            type: DataTypes.STRING,
            allowNull: false

        },
        attachement: {
            type: DataTypes.STRING,


        },
        //likers, timestamps
    }, {

        bdd,
        tableName: 'Post',
        //timestamps: false
    }

);