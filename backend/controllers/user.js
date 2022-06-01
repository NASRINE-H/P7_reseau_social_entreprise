//on retrouve ici la logique métier en lien avec nos utilisateurs appliqué aux routes post pour les opérations 
//d'inscription et de connexion 

//  utilise l'algorithme bcrypt pour hasher le mot de passe 
const bcrypt = require('bcrypt');


//Les JSON web tokens sont des tokens encodés qui peuvent être utilisés pour l'autorisation.

const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Middleware pour  un nouveau utilisateur

/**pour créer un nouveau utilisateur */
exports.signup = (req, res, next) => {
    const userJson = JSON.parse(req.body.user);
    bcrypt.hash(userJson.password, 10)
        .then(hash => {
            const user = new User({
                username: userJson.username,
                email: userJson.email,
                password: hash,
                isAdmin: userJson.isAdmin
            });
            console.log("new user" + user);
            user.save(user)

            .then((user) => {
                    if (user) {
                        return res.status(201).json({ message: 'Utilisateur créé !' })
                    }
                })
                .catch((error) => { res.status(400).json({ error }) });
        })

    .catch((error) => { res.status(500).json({ error }) });
};


/**login pour se connecter */
exports.login = (req, res, next) => {
    const userJson = JSON.parse(req.body.user);
    console.log(userJson.email);
    User.findOne({
            where: { email: userJson.email }
        })
        .then(user => {

            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            bcrypt.compare(userJson.password, user.password)
                .then(valid => {

                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    res.status(200).json({
                        userId: user._id,

                        //utliliser la librairie  jwt pour generer un token 
                        token: jwt.sign({
                                userId: user._id

                            },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(401).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};