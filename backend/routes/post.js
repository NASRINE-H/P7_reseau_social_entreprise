const express = require('express');
//const multer = require('../middelware/multer');

const router = express.Router();

const postCtrl = require('../controllers/post');

//const Password = require('../middleware/Password');
const auth = require('../middleware/auth');
//middleware multer pour la gestion des images
//const multer = require('../middleware/multer-config');



router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);



module.exports = router;