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
            type: DataTypes.STRING,
            allowNull: false

        },
        attachement: {
            type: DataTypes.STRING
        },
        /* likes: {
             type: DataTypes.INTEGER
         },
         dislikes: {
             type: DataTypes.INTEGER
         },
         usersLiked: {
             type: [DataTypes.INTEGER]
         },
         usersDisliked: {
             type: [DataTypes.INTEGER]
         },*/
        //likers, timestamps
    }, {

        bdd,
        tableName: 'Post',
        //timestamps: false
    }

);