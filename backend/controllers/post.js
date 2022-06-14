const post = require('../app');
const Post = require('../models/post'); //exiger
const User = require('../models/user');
const getOneUser = require('./user');
const jwt = require('jsonwebtoken');
const postLikes = require('../models/postLikes');


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
        console.log("fonction getOne");
        console.log("PostId:" + postId);

        Post.findOne({
                where: {
                    id: postId
                }
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
            include: {
                model: User,
                attributes: [
                    "username"
                ]
            }
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
        userId: req.auth.userId, // est ce que cet id est celui de l'utilisateur ou celui du post
        //        id: PostObject.id, // est ce que cet id est celui de l'utilisateur ou celui du post
        titre: PostObject.titre,
        content: PostObject.content,
        // likes: 0,
        // dislikes: 0,
        // usersLiked: [],
        // usersDisliked: []
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
        // const actualUserId = req.params.actualUserId; // cette ligne doit être modifié
        // const isAdmin = true; // cette ligne doit être modifié


        // trouver le post à modifier dans la BDD
        Post.findOne({
                where: {
                    id: postId
                }
            })
            .then((post) => {
                // récupérer le userId du créateur du post
                const postUserId = post.userId;

                // récuperer l'id de l'utilisateur actuel


                if (req.auth.userId == postUserId ||
                    req.auth.isAdmin
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

                } // fin else actualUserId || admin


            }) // fin findOne post then
            .catch((error) => {
                res.status(500).json({
                    message: 'Post non trouvé, findOne a retourné une erreur',
                    error: error
                });
            }); // fin findOne Post .catch

    } // fin else !req.params.id
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






                if (req.auth.userId == postUserId ||
                    req.auth.isAdmin
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

            }) // fin findOne post then
            .catch((error) => {
                res.status(500).json({
                    message: 'Post non trouvé, findOne a retourné une erreur',
                    error: error
                });
            }); // fin findOne Post .catch

    } // fin else !req.params.id
};


// /** créer un postLike */
// function createPostLike(postId, userId, like) {

//     const newPostLike = new postLikes({
//         userId: userId,
//         postId: postId,
//         like: like,
//     });
//     // afficher dans la console pour debeug
//     console.log("fonction create");
//     console.log("PostLike:" + newPostLike);


//     // Enregistrer dans la BDD
//     newPostLike.save()
//         .then(() => {
//             res.status(201).json({
//                 message: 'Postlike créé'
//             });
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 message: 'Postlike save a retourné une erreur',
//                 error: error
//             });
//         });

// };


//faire like ou deislike 
exports.likeDislikePost = (req, res, next) => {

    console.log("***************************");

    const reqlike = req.body.like
    const postId = req.params.id
    const token = req.headers.authorization.split(' ')[1];
    const userId = jwt.decode(token).userId;

    if (userId != null) {
        Post.findOne({
                where: {
                    id: postId
                }
            })
            .then(() => {

                postLikes.findOne({
                        where: {
                            postId: postId,
                            userId: userId
                        }
                    })
                    .then(dblike => {
                        // on teste le cas où on a reçu un like =1
                        // on vérifie si l'utilisateur
                        // Premier like de l'utilisateur
                        if (dblike.like == reqlike) {

                            console.log("LIKE TROUVE, FAUT SUPPRImer LIKE***************************");
                        } else {
                            // l'utilisateur a déjà likeé
                            // On veut éviter like multiple
                            console.log("On ne peut liker et disliker un poste au même temps***************************");

                            //                            throw new Error("On ne peut liker et disliker un poste au même temps");
                        }
                    })
                    .catch(() => {
                        // l'utilisateur fait un nouveau like

                        const newPostLike = new postLikes({
                            userId: userId,
                            postId: postId,
                            like: like,
                        });
                        // afficher dans la console pour debeug
                        console.log("fonction create");
                        console.log("PostLike:" + newPostLike);


                        // Enregistrer dans la BDD
                        newPostLike.save()
                            .then(() => {
                                res.status(201).json({
                                    message: 'Postlike créé'
                                });
                            })
                            .catch((error) => {
                                res.status(400).json({
                                    message: 'Postlike save a retourné une erreur',
                                    error: error
                                });
                            });
                    })


            }) // fin findOne post then
            .catch((error) => {
                res.status(500).json({
                    message: 'Post non trouvé, findOne a retourné une erreur',
                    error: error
                });
            }); // fin findOne Post .catch
    } else {
        // UserId NULL
        throw new Error("UserID NULL")
    }
}

// function checkUser(userIdArray, userId) {
//     return userIdArray.find(id => id === userId);

// }

// function createNewUserIdArray(userIdArray, userId) {
//     return userIdArray.filter(id => id !== userId);
// }