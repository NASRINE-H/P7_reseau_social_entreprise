const express = require('express');
//const multer = require('../middelware/multer');

const router = express.Router();

const commentCtrl = require('../controllers/comment');

//const Password = require('../middleware/Password');
const auth = require('../middleware/auth');
//middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');

// Ajouter un nouveau commentaire
router.post("/:id", auth, commentCtrl.createComment);



// Supprimer un commentaire
router.delete("/:id", auth, commentCtrl.deleteComment);

//recupérer tous les postes
router.get("/:id", auth, commentCtrl.getAllComment);




module.exports = router;