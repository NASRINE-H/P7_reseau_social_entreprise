const Post = require('../models/post'); //exiger
const User = require('../models/user');




const fs = require("fs");
const Comment = require('../models/comment');

/**
 * recupère tous les posts 
 * @param {*} req la requete reçu 
 * @param {*} res la réponse a la requete 
 */

/**lire un poste */
exports.getOnePost = (req, res) => {
    // verifier si la requête contient l'ID du post
    if (!req.params.id) {

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
            include: [{
                model: User,
                attributes: [
                    "username"
                ]
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: [
                        "username"
                    ]
                }]
            }],
            order: [
                ["createdAt", "DESC"]
            ]
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
    console.log("BackEND: body: ", req.body)
    const PostObject = JSON.parse(req.body.post);
    const newPost = new Post({
        userId: req.auth.userId, // est ce que cet id est celui de l'utilisateur ou celui du post     
        titre: PostObject.titre,
        content: PostObject.content,
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
            Post.findOne({
                    include: [{
                        model: User,
                        attributes: [
                            "username"
                        ]
                    }, {
                        model: Comment,
                        include: [{
                            model: User,
                            attributes: [
                                "username"
                            ]
                        }]
                    }],
                    order: [
                        ["createdAt", "DESC"]
                    ],
                    where: {
                        id: newPost.id
                    }
                })
                .then((post) => {
                    res.status(201).json({
                        message: 'Post créé',
                        post: post
                    });
                })

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
        // const PostObject = (req.body.post);
        // postId
        const postId = req.params.id;

        // afficher dans la console pour debeug
        console.log("fonction update");
        console.log("PostObject:" + PostObject, " , PostId:" + postId);

        // gestion des images / attachements
        if (req.file) {
            imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }

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
                    post.titre = PostObject.titre;
                    post.content = PostObject.content;
                    if (req.file) {
                        post.attachement = imagePost

                    }
                    post.save()
                        /*Post.update({
                    
                                titre: PostObject.titre,
                                content: PostObject.content,
                                 attachement: imagePost
                            }, {
                                where: {
                                    id: postId
                                }
                            })*/
                        .then(() => {
                            res.status(201).json({
                                message: 'Post modifié',
                                post: post
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
                const postUserId = post.userId;
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