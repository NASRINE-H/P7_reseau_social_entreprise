const {
    DataTypes,
    Models,
    Sequelize
} = require('sequelize');
const {
    bdd
} = require('./index');

module.exports = bdd.define("post", {



        titre: {
            type: DataTypes.STRING,
            allowNull: false

        },

        content: {
            type: DataTypes.TEXT,
            allowNull: false

        },
        attachement: {
            type: DataTypes.STRING
        },

    }, {

        bdd,
        tableName: 'Post',
        //timestamps: false
    }

);