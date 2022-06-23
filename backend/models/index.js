const {
    Sequelize
} = require('sequelize');


const bdd = new Sequelize(
    'Groupomania',
    'root',
    'Nesrine@ines4421', {
        host: 'localhost',
        dialect: 'mysql',
    });
/**
 * tester la connexion BDD
 */
const test = async() => {
    try {
        await bdd.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
const loadmodel = async() => {
    const User = require('./user');
    const Post = require('./post');
    //const postLikes = require('./postLikes');
    const Comment = require('./comment');
    Post.belongsTo(User, { onDelete: "cascade" }); //L' A.belongsTo(B) = un-à-un 
    //existe entre A et B, la clé étrangère étant définie dans le modèle source ( A).
    Post.hasMany(Comment, { onDelete: "cascade" });
    Comment.belongsTo(User, { onDelete: "cascade" });
    //postLikes.belongsTo(User);
    //postLikes.belongsTo(Post);

    bdd.sync({ force: true })
        .catch(error => console.log(error))
}

module.exports = { bdd, test, loadmodel };