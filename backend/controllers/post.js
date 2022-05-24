const { post } = require('../app');
const Post = require('../models/post'); //exiger
const User = require('../models/user');
/**
 * recupère tous les posts 
 * @param {*} req la requete reçu 
 * @param {*} res la réponse a la requete 
 */
exports.getAll = (req, res) => {
    Post.findAll({ include: User })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
}

/** créer un post */
//pour créer un post 
exports.createPost = (req, res, next) => {



    const PostObject = JSON.parse(req.body.post);

    const post = new Post({
        UserId: PostObject.UserId,
        titre: PostObject.titre,
        content: PostObject.content
    })
    if (req.file) {
        imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    console.log(post);
    post.save().then(
            () => {
                res.status(201).json({
                    message: 'Post créé'
                });
            }
        )
        .catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );

};

exports.modifyPostt = (req, res) => {};

//exports.readPost = (req, res) => {};
//exports.deletePost = (req, res) => {};