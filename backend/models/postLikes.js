const {
    DataTypes,
    Models,
    Sequelize
} = require('sequelize');
const {
    bdd
} = require('./index');
module.exports = bdd.define("postLikes", {
    likeValue: {
        type: DataTypes.INTEGER,
        unique: true,
    }
}, {

    bdd,
    tableName: 'postlikes',
    //timestamps: false
});