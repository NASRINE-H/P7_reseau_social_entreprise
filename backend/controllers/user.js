//on retrouve ici la logique métier en lien avec nos utilisateurs appliqué aux routes post pour les opérations 
//d'inscription et de connexion 

//  utilise l'algorithme bcrypt pour hasher le mot de passe 
const bcrypt = require('bcrypt');

require('dotenv').config()


//Les JSON web tokens sont des tokens encodés qui peuvent être utilisés pour l'autorisation.

const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Middleware pour  un nouveau utilisateur

/**pour créer un nouveau utilisateur */
exports.signup = (req, res, next) => {
    const userJson = req.body;
    bcrypt.hash(userJson.password, 10)
        .then(hash => {
            const user = new User({
                username: userJson.username,
                email: userJson.email,
                password: hash,

            });
            console.log("new user" + user);
            user.save(user)

            .then((user) => {
                    if (user) {

                        return res.status(200).json({
                            userId: user.id,
                            isAdmin: user.isAdmin,
                            username: user.username,

                            //utliliser la librairie  jwt pour generer un token 
                            token: jwt.sign({
                                    userId: user.id,
                                    isAdmin: false,
                                },
                                process.env.TOKEN_KEY, {
                                    expiresIn: '24h'
                                }
                            )
                        });
                    }
                })
                .catch((error) => {
                    res.status(400).json({
                        error
                    })
                });
        })

    .catch((error) => {
        res.status(500).json({
            error
        })
    });
};


/**login pour se connecter */
exports.login = (req, res, next) => {
    const userJson = req.body;
    console.log(userJson.email);
    User.findOne({
            where: {
                email: userJson.email
            }
        })
        .then(user => {

            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }

            bcrypt.compare(userJson.password, user.password)
                .then(valid => {

                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        });
                    }

                    res.status(200).json({
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        username: user.username,

                        //utliliser la librairie  jwt pour generer un token 
                        token: jwt.sign({
                                userId: user.id,
                                isAdmin: user.isAdmin,


                            },
                            process.env.TOKEN_KEY, {
                                expiresIn: '24h'
                            }
                        )
                    });
                })
                .catch(error => res.status(401).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};
// pour récupérer un seul utilisateur
exports.getOneUser = (req, res) => {
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => res.status(200).json(user))
        .catch(() => res.status(404).JSON({
            message: "aucun poste "
        }))
};
//récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
    User.findAll({
            //La commande ORDER BY permet de trier les lignes dans un résultat d’une requête SQL.
            // Il est possible de trier les données sur une ou plusieurs 
            //colonnes, par ordre ascendant ou descendant.
            order: [
                ["username", "ASC"]
            ]
        })
        .then((users) => {
            if (users.length > 0) {
                res.status(200).json(users);
            } else {
                res.status(200).json({
                    message: "Pas de post à afficher"
                });
            }
        })
        .catch((error) => res.status(500).json(error));
};

//modifier un utilisateurs
exports.modifyUser = (req, res) => {

    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {


            if (user.id === req.auth.userId) {
                if (req.body.password) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            user.password = hash;
                            user.email = req.body.email;
                            user.username = req.body.username;

                            user.save()
                                .then((user) => res.status(200).json(user))
                                .catch((error) => res.status(404).json(error));
                        }).catch((error) => {
                            res.status(400).json({
                                error,
                                message: "mot de passe non modifié"
                            })
                        });
                } else {
                    console.log("mot de passe non modifié");
                }



            } else {
                res.status(403).json({
                    message: "Action non autorisée."
                });
            }
        })
        .catch((error) => res.status(500).json(error));



};
//suprimer un utilisateur
exports.deleteUser = (req, res, next) => {

    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            if (user.id == req.auth.userId) {
                user.destroy()
                    .then(() =>
                        res.status(204).json({
                            message: "Elément supprimé."
                        })
                    )
                    .catch((error) => res.status(501).json(error));

            } else {
                res.status(403).json({
                    message: "Action non autorisée."
                });
            }



        })
        .catch((error) => {
            res.status(500).json({
                message: 'Utilisateur non trouvé',
                error: error
            });
        });
};