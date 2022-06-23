const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');


exports.createComment = (req, res, next) => {

    //    const CommentObject = JSON.parse(req.body.content);
    const newComment = new Comment({
        userId: req.auth.userId,
        content: req.body.content,
        postId: req.params.id,

    });
    newComment.save()
        .then(() => {
            res.status(201).json({
                message: 'comment créé'
            });
        })
        .catch((error) => {
            res.status(400).json({
                message: 'comment save a retourné une erreur'
            });
        });
};

exports.deleteComment = (req, res, next) => {
    if (!req.params.id) {
        res.status(400).json({
            message: "Requête incomplète."
        });
    } else {
        //commentId
        const commentId = req.params.id;
        // trouver le commentaire numero id dans la BDD
        Comment.findOne({
                where: {
                    id: commentId
                }
            })
            .then((comment) => {
                if (req.auth.userId == comment.userId ||
                    req.auth.isAdmin
                ) {
                    Comment.destroy({
                            where: {
                                id: commentId
                            },
                        })
                        .then(() =>
                            res.status(200).json({
                                message: "Le commentaire a été supprimé !"
                            })
                        )
                        .catch((error) => {
                            res.status(500).json({
                                message: 'Destroy a retourné une erreur',
                                error: error
                            });
                        });
                } else

                {
                    res.status(403).json({
                        message: "Action non autorisée, l'utilisateur n'est pas le propritaire du post ni un admin."
                    });

                }
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'FindOne a retourné une erreur',
                    error: error
                });
            });
    }
}