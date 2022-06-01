const { post } = require('../app');
const Post = require('../models/post'); //exiger
const User = require('../models/user');
/**
 * recupère tous les posts 
 * @param {*} req la requete reçu 
 * @param {*} res la réponse a la requete 
 */
exports.getAllPosts = (req, res) => {
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
/**modifier un poste */
exports.modifyPost = (req, res) => {

    const id = req.params.id;

    const PostObject = JSON.parse(req.body.post);

    if (req.file) {
        imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    //console.log('Modification du post :' + id + " nouveau titre: " + PostObject.titre + " nouveau contenu: " + PostObject.content);
    Post.update({
        titre: PostObject.titre,
        content: PostObject.content
            //        attachement: req.body.newImg
    }, { where: { id: id } })

    .then(
            () => {
                res.status(201).json({
                    message: 'Post modifié'
                });
            }
        )
        .catch(
            (error) => {
                res.status(500).json({
                    error: error
                });
            }
        );


};
/**lire un poste */
exports.getOnePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }))
};
/**supprimer un poste */
exports.deletePost = (req, res) => {
    if (!req.params.id
        //|| !req.headers.authorization
    ) {
        console.log("req.params.id=", req.params.id)
        console.log("req.headers.authorization=", req.headers.authorization)

        res.status(400).json({ message: "Requête incomplète." });
    } else {
        //const token = jwt.getUserId(req.headers.authorization);
        const userId = 1;
        // const isAdmin = token.isAdmin;

        Post.findOne({ where: { id: req.params.id } })
            .then((post) => {
                console.log("---------post id:" + req.params.id + " found");
                console.log("---------post userid:" + post.userId + " ==userId" + userId);
                if (true
                    //post.userId == userId
                    //|| isAdmin
                ) {
                    console.log("--------- delete post");
                    console.log("post.imageUrl : ", post.imageUrl);
                    if (post.imageUrl) {
                        // Supprimer l'image du server
                        const filename = post.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${filename}`, () => {
                            Post.destroy({
                                    where: { id: req.params.id },
                                })
                                .then(() =>
                                    res.status(200).json({ message: "Le post a été supprimé !" })
                                )
                                .catch((err) => res.status(500).json(err));
                        });
                    } else {
                        Post.destroy({ where: { id: req.params.id } })
                            .then(() =>
                                res.status(200).json({ message: "Elément supprimé." })
                            )
                            .catch((err) => res.status(500).json(err));
                    }
                } else {
                    res.status(403).json({ message: "Action non autorisée." });
                }
            })
            .catch((err) => res.status(500).json(err));
    }
};