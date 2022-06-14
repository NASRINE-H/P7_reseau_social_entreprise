const express = require('express');
//const multer = require('../middelware/multer');

const router = express.Router();

const commentCtrl = require('../controllers/comment');

//const Password = require('../middleware/Password');
const auth = require('../middleware/auth');
//middleware multer pour la gestion des images
//const multer = require('../middleware/multer-config');

// Ajouter un nouveau commentaire
router.post("/", auth, commentCtrl.createComment);

// Récupérer les commentaires d'un post
router.get("/from/:id", auth, commentCtr.getOneComment);

// Modifier un commentaire
router.put("/:id", auth, commentCtrl.modifyComment);

// Supprimer un commentaire
router.delete("/:id", auth, commentCtrl.deleteComment);

// Liker ou disliker un commentaire
//router.post("/like", auth,commentCtrl. );

// Récupérer les likes d'un commentaire
//router.get("/:id/like", auth, commentCtrl);