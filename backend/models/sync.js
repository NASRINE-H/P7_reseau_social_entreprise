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
const User = require('./user');
const Post = require('./post');
Post.belongsTo(User);
bdd.sync({ alter: true })
    .then(result => {
        console.log("bdd mise a jour")
        process.exit(1)
    })
    .catch(error => console.log(error));