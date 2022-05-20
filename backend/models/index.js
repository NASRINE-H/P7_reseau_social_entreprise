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
    Post.belongsTo(User); //L' A.belongsTo(B)association signifie qu'une relation un-à-un existe entre Aet B, la clé étrangère étant définie dans le modèle source ( A).
    bdd.sync({ alter: true });
}

module.exports = { bdd, test, loadmodel };