const express = require('express');
//const multer-config = require('../middelware/multer');

const router = express.Router();

const postCtrl = require('../controllers/post');

//const Password = require('../middleware/Password');
const auth = require('../middleware/auth');
//middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');


// Route qui permet de récupérer toutes les postes
router.get('/', auth, postCtrl.getAllPosts);
// Route qui permet de créer "un poste"
router.post('/', auth, multer, postCtrl.createPost);
//Route qui permet de récupérer "un poste"
router.get('/:id', auth, postCtrl.getOnePost);
// Route qui permet de modifier "un poste"
router.put('/:id', auth, multer, postCtrl.modifyPost);
// Route qui permet de supprimer "un poste"
router.delete('/:id', auth, postCtrl.deletePost);




module.exports = router;