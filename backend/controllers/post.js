const post = require('../app');
const Post = require('../models/post'); //exiger
const User = require('../models/user');
const getOneUser = require('./user');

const fs = require("fs");

/**
 * recupère tous les posts 
 * @param {*} req la requete reçu 
 * @param {*} res la réponse a la requete 
 */

/**lire un poste */
exports.getOnePost = (req, res) => {
    // verifier si la requête contient l'ID du post
    if (!req.params.id) {
        //console.log("req.params.id=", req.params.id)
        // console.log("req.headers.authorization=", req.headers.authorization)
        res.status(400).json({
            message: "Requête incomplète."
        });
    } else {
        // postId
        const postId = req.params.id;

        // afficher dans la console pour debeug
        // console.log("fonction getOne");
        //console.log("PostId:" + postId);

        Post.findOne({
                id: postId
            })
            .then(post => res.status(200).json(post))
            .catch((error) => {
                res.status(500).json({
                    message: 'Post n est pas trouvé, findOne a retourné une erreur',
                    error: error
                });
            });
    }
};

/**lire tous les postes */
exports.getAllPosts = (req, res) => {
    Post.findAll({
            include: User
        })
        .then(posts => res.status(200).json(posts))
        .catch((error) => {
            res.status(500).json({
                message: 'aucun post trouvé, findAll a retourné une erreur',
                error: error
            });
        });
}

/** créer un post */
exports.createPost = (req, res, next) => {
    // PostObject contient l'objet req.body en format JSON
    const PostObject = JSON.parse(req.body.post);

    const newPost = new Post({
        userId: PostObject.UserId, // est ce que cet id est celui de l'utilisateur ou celui du post
        //        id: PostObject.id, // est ce que cet id est celui de l'utilisateur ou celui du post
        titre: PostObject.titre,
        content: PostObject.content
    });
    // afficher dans la console pour debeug
    console.log("fonction create");
    console.log("PostObject:" + PostObject);

    // gestion des images / attachements
    if (req.file) {

        newPost.attachement = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    // Enregistrer dans la BDD
    newPost.save()
        .then(() => {
            res.status(201).json({
                message: 'Post créé'
            });
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Post save a retourné une erreur',
                error: error
            });
        });

};

/**modifier un poste */
exports.modifyPost = (req, res) => {
    // verifier si la requête contient l'ID du post
    if (!req.params.id) {
        console.log("req.params.id=", req.params.id)
        console.log("req.headers.authorization=", req.headers.authorization)
        res.status(400).json({
            message: "Requête incomplète."
        });
    } else {

        // PostObject contient l'objet req.body en format JSON
        const PostObject = JSON.parse(req.body.post);
        // postId
        const postId = req.params.id;

        // afficher dans la console pour debeug
        console.log("fonction update");
        console.log("PostObject:" + PostObject, " , PostId:" + postId);

        // gestion des images / attachements
        if (req.file) {
            imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }
        // recuperer le userID du user actuel qui est entrain de modifier le post et est ce qu'il est admin ou pas (à partir de la requete)
        const actualUserId = req.params.actualUserId; // cette ligne doit être modifié
        const isAdmin = true; // cette ligne doit être modifié
        getOneUser(actualUserId)
            .then((user) => {
                isAdmin = user.isAdmin;
            })
            .catch(() => {
                isAdmin = false
            });
        // recuperer le userID du createur du post 
        const postUserId = post.UserId; // cette ligne doit être modifié (à partir du postId)
        // afficher dans la console pour debeug
        console.log("actualUserId:" + actualUserId, ", isAdmin:", isAdmin + ", postUserId:" + postUserId);

        if (actualUserId == postUserId ||
            isAdmin
        ) {

            // modification du post numero "postId"
            Post.update({
                    titre: PostObject.titre,
                    content: PostObject.content
                }, {
                    where: {
                        id: postId
                    }
                })
                .then(() => {
                    res.status(201).json({
                        message: 'Post modifié'
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: 'Post non modifié, update a retourné une erreur',
                        error: error
                    });
                });
        } else {
            res.status(403).json({
                message: "Action non autorisée, l'utilisateur n'est pas le propritaire du post ni un admin."
            });

        }
    }
};

/**supprimer un poste */
exports.deletePost = (req, res) => {
    // verifier si la requête contient l'ID du post
    if (!req.params.id) {
        console.log("req.params.id=", req.params.id)
        console.log("req.headers.authorization=", req.headers.authorization)
        res.status(400).json({
            message: "Requête incomplète."
        });
    } else {
        // postId
        const postId = req.params.id;
        // afficher dans la console pour debeug
        console.log("fonction delete");
        console.log("PostId:" + postId);

        // trouver le post numero id dans la BDD
        Post.findOne({
                where: {
                    id: postId
                }
            })
            .then((post) => {
                // le post a été trouvé avec son ID
                console.log("**********************post trouvé");
                console.log("req.headers.authorization=", req.headers.authorization)
                const token = jwt.getUserId(req.headers.authorization);
                const actualUserId = token.userId;
                const isAdmin = token.isAdmin;

                console.log("actualUserId=", actualUserId)
                console.log("isAdmin=", isAdmin)

                // recuperer le userID du createur du post 
                const postUserId = 1; // cette ligne doit être modifié (à partir du postId)
                console.log("currentUserId:" + actualUserId + ", postUserId:" + postUserId, ", isAdmin:", isAdmin);
                // getOneUser(actualUserId)
                //     .then((user) => {
                //         isAdmin = user.isAdmin;
                //         console.log("admin trouvé");
                //     })
                //     .catch(() => {
                //         isAdmin = false
                //         console.log("admin false");
                //     });
                // // afficher dans la console pour debeug
                // console.log("currentUserId:" + actualUserId + ", postUserId:" + postUserId, ", isAdmin:", isAdmin);

                if (actualUserId == postUserId ||
                    isAdmin
                ) {

                    // gestion des images / attachements
                    if (post.imageUrl) {
                        // Supprimer l'image du server
                        const filename = post.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${filename}`, () => {
                            Post.destroy({
                                    where: {
                                        id: postId
                                    },
                                })
                                .then(() =>
                                    res.status(200).json({
                                        message: "Le post a été supprimé !"
                                    })
                                )
                                .catch((error) => {
                                    res.status(500).json({
                                        message: 'Post avec img non supprime, delete a retourné une erreur',
                                        error: error
                                    });
                                });

                        });
                    }
                    // pour les posts qui ne contiennet pas d'images
                    else {
                        Post.destroy({
                                where: {
                                    id: postId
                                }
                            })
                            .then(() =>
                                res.status(200).json({
                                    message: "Elément supprimé."
                                })
                            )
                            .catch((error) => {
                                res.status(500).json({
                                    message: 'Post non supprimé, delete a retourné une erreur',
                                    error: error
                                });
                            });
                    }
                } else {
                    res.status(403).json({
                        message: "Action non autorisée, l'utilisateur n'est pas le propritaire du post ni un admin."
                    });
                }
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Post non trouvé, findOne a retourné une erreur',
                    error: error
                });
            });
    }
};