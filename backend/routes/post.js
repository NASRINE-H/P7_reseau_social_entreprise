const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/post');

//const Password = require('../middleware/Password');
//const auth = require('../middleware/auth');
//middleware multer pour la gestion des images
//const multer = require('../middleware/multer-config');



router.get('/', postCtrl.getAll);
router.post('/', postCtrl.createPost);
//router.get('/', postCtrl.readPost);
//router.put('/:id', postCtrl.updatePost);
//router.delete('/:id', postCtrl.deletePost);



module.exports = router;